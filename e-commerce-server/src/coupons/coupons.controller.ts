// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
// } from '@nestjs/common';
// import { CouponsService } from './coupons.service';
// import { CreateCouponDto } from './dto/create-coupon.dto';
// import { UpdateCouponDto } from './dto/update-coupon.dto';

// @Controller('coupons')
// export class CouponsController {
//   constructor(private readonly couponsService: CouponsService) {}

//   @Post()
//   create(@Body() createCouponDto: CreateCouponDto) {
//     return this.couponsService.create(createCouponDto);
//   }

//   @Get()
//   findAll() {
//     return this.couponsService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.couponsService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateCouponDto: UpdateCouponDto) {
//     return this.couponsService.update(+id, updateCouponDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.couponsService.remove(+id);
//   }
// }


// src/coupon/coupon.controller.ts
import { Controller, Post, Body, Param, Put, Delete,Get, BadRequestException, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { CouponService } from './coupons.service';
import { ValidateCouponDto } from './dto/validate-coupon.dto';
import { CouponResponseDto } from './dto/coupon-response.dto';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Coupon } from './entities/coupon.entity';

@Controller('api/coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post('validate')
  async validateCoupon(
    @Body() validateCouponDto: ValidateCouponDto,
  ): Promise<CouponResponseDto> {
    const discount = await this.couponService.validateCoupon(validateCouponDto);
    return { discount };
  }

  @Post('create')
  async createCoupon(@Body() createCouponDto: CreateCouponDto) {
    try {
      const coupon = await this.couponService.createCoupon(createCouponDto);
      return { statusCode: 201, message: 'Coupon created successfully', coupon };
    } catch (error) {
      console.error('Error creating coupon:', error);
      throw new BadRequestException({
        statusCode: 400,
        message: 'Failed to create coupon',
      });
    }
  }

  @Put('update/:id')
  async updateCoupon(
    @Param('id', ParseIntPipe) id: number, // Ensures id is parsed as an integer
    @Body() updateCouponDto: UpdateCouponDto,
  ) {
    try {
      const coupon = await this.couponService.updateCoupon(id, updateCouponDto);
      return coupon;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      console.error('Error updating coupon:', error);
      throw new BadRequestException({
        statusCode: 400,
        message: 'Failed to update coupon',
      });
    }
  }

  @Delete('delete/:id')
  async deleteCoupon(@Param('id') id: number) {
    const result = await this.couponService.deleteCoupon(id);
    return { statusCode: result.statusCode, message: result.message };
  }
  

  @Get('/')
async getAllCoupons(): Promise<{ message?: string; coupons?: Coupon[] }> {
  const { statusCode, message, coupons } = await this.couponService.getAllCoupons();

  if (!coupons || coupons.length === 0) {
    return { message: message || 'No coupons available at the moment.' };
  }

  return { coupons };
}

  


}
