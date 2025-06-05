
import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coupon } from './entities/coupon.entity';
import { ValidateCouponDto } from './dto/validate-coupon.dto';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { DiscountType } from './enums/discount-type.enum';

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupon)
    private couponRepository: Repository<Coupon>,
  ) {}

  async validateCoupon(validateCouponDto: ValidateCouponDto): Promise<number> {
    const { coupon_code, totalAmount } = validateCouponDto;

    const coupon = await this.couponRepository.findOne({
        where: { coupon_code, is_active: true },
    });

    if (!coupon) {
        throw new BadRequestException('Invalid or inactive coupon code.');
    }

    if (coupon.expiry_date < new Date()) {
        throw new BadRequestException('Coupon has expired.');
    }

    if (totalAmount < coupon.min_purchase) {
        throw new BadRequestException('Minimum purchase not met.');
    }

    if (coupon.used_count >= coupon.usage_limit) {
        throw new BadRequestException('Coupon usage limit reached.');
    }

    let discount = 0;
    if (coupon.discount_type === 'fixed') {
        discount = coupon.discount_value;
    } else if (coupon.discount_type === 'percentage') {
        discount = (coupon.discount_value / 100) * totalAmount;
    }

    return discount; // Do not increment `used_count` here, only when applied
}

async createCoupon(createCouponDto: CreateCouponDto): Promise<Coupon> {
  const { coupon_code, discount_type, discount_value, discount_percentage } = createCouponDto;

  if (!coupon_code || coupon_code.trim() === '') {
      throw new BadRequestException('Coupon code cannot be empty or just whitespace.');
  }

  if ((discount_type === DiscountType.FIXED && !discount_value) || 
      (discount_type === DiscountType.PERCENTAGE && !discount_percentage)) {
      throw new BadRequestException('Either discount_value or discount_percentage is required based on the selected discount type.');
  }

  if (discount_type === DiscountType.FIXED && discount_percentage) {
      throw new BadRequestException('You cannot provide both discount_value and discount_percentage.');
  }

  if (discount_type === DiscountType.PERCENTAGE && discount_value) {
      throw new BadRequestException('You cannot provide both discount_percentage and discount_value.');
  }

  const existingCoupon = await this.couponRepository.findOne({ where: { coupon_code } });
  if (existingCoupon) {
      throw new BadRequestException('Coupon code already exists.');
  }

  
  const coupon = this.couponRepository.create({
      coupon_code,
      discount_type,
      discount_value: discount_type === DiscountType.FIXED ? discount_value ?? 0 : 0,
      discount_percentage: discount_type === DiscountType.PERCENTAGE ? discount_percentage ?? 0 : 0,
      expiry_date: createCouponDto.expiry_date,
      min_purchase: createCouponDto.min_purchase,
      usage_limit: createCouponDto.usage_limit,
      isUsed: false,
  });

  return await this.couponRepository.save(coupon);
}

  async updateCoupon(id: number, updateCouponDto: UpdateCouponDto): Promise<{ statusCode: number; message: string; coupon?: Coupon }> {
    try {
      const coupon = await this.couponRepository.findOne({ where: { id } });
  
      if (!coupon) {
        throw new NotFoundException({ statusCode: 404, message: 'Coupon not found.' });
      }
  
     
      if (updateCouponDto.discount_value !== undefined && updateCouponDto.discount_percentage !== undefined) {
        throw new BadRequestException({
          statusCode: 400,
          message: 'You can only update either discount_value or discount_percentage, not both.',
        });
      }
  
      
      if (
        updateCouponDto.discount_type &&
        updateCouponDto.discount_type !== 'fixed' &&
        updateCouponDto.discount_type !== 'percentage'
      ) {
        throw new BadRequestException({ statusCode: 400, message: 'Invalid discount_type. Use "fixed" or "percentage".' });
      }
  
      // Ensure discount_value or discount_percentage matches discount_type
      if (updateCouponDto.discount_type === 'fixed' && updateCouponDto.discount_percentage !== undefined) {
        throw new BadRequestException({
          statusCode: 400,
          message: 'For "fixed" discount type, only discount_value can be updated.',
        });
      }
  
      if (updateCouponDto.discount_type === 'percentage' && updateCouponDto.discount_value !== undefined) {
        throw new BadRequestException({
          statusCode: 400,
          message: 'For "percentage" discount type, only discount_percentage can be updated.',
        });
      }
  
      //  Validate expiry_date if provided
      if (updateCouponDto.expiry_date) {
        const expiryDateObj = new Date(updateCouponDto.expiry_date);
  
        if (isNaN(expiryDateObj.getTime())) {
          throw new BadRequestException({ statusCode: 400, message: 'Invalid expiry date format. Use YYYY-MM-DD.' });
        }
  
        if (expiryDateObj < new Date()) {
          throw new BadRequestException({ statusCode: 400, message: 'Expiry date must be in the future.' });
        }
  
        updateCouponDto.expiry_date = expiryDateObj as any; // Convert string to Date before updating
      }
  
      // Update coupon details
      Object.assign(coupon, updateCouponDto);
      const updatedCoupon = await this.couponRepository.save(coupon);
  
      return { statusCode: 200, message: 'Coupon updated successfully', coupon: updatedCoupon };
  
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
  
      console.error('Unexpected Error:', error);
      throw new InternalServerErrorException({ statusCode: 500, message: 'Something went wrong while updating the coupon.' });
    }
  }
  
  
  //  Delete a coupon with status code
  async deleteCoupon(id: number): Promise<{ statusCode: number; message: string }> {
    try {
      const coupon = await this.couponRepository.findOne({ where: { id } });
  
      if (!coupon) {
        throw new NotFoundException({ statusCode: 404, message: 'Coupon not found.' });
      }
  
      await this.couponRepository.remove(coupon);
  
      return { statusCode: 200, message: 'Coupon deleted successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
  
      console.error('Unexpected Error:', error);
      throw new InternalServerErrorException({ statusCode: 500, message: 'Something went wrong while deleting the coupon.' });
    }
  }
  
  
  
  async getAllCoupons(): Promise<{ statusCode: number; message: string; coupons: Coupon[] }> {
    try {
      const coupons = await this.couponRepository.find({
        order: { createdAt: 'DESC' }, 
    });
  
      return {
        statusCode: 200,
        message: coupons.length > 0 ? 'Coupons retrieved successfully' : 'No coupons found',
        coupons,
      };
    } catch (error) {
      console.error('Unexpected Error:', error);
      throw new InternalServerErrorException({ statusCode: 500, message: 'Something went wrong while fetching coupons.' });
    }
  }
  


  async findByCode(couponCode: string): Promise<Coupon | null> {
    return this.couponRepository.findOne({ where: { coupon_code: couponCode, is_active: true } });
  }
  
  async incrementUsage(couponId: number) {
    await this.couponRepository.increment({ id: couponId }, 'used_count', 1);
  }
  
  async decrementUsage(couponCode: string) {
    const coupon = await this.findByCode(couponCode);
    if (coupon && coupon.used_count > 0) {
      await this.couponRepository.decrement({ id: coupon.id }, 'used_count', 1);
    }
  }
  
        
}
