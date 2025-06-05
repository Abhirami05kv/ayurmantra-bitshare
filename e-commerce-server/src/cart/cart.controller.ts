import { Controller, Post, Get, Delete, Body, Param, Req, UseGuards, NotFoundException, BadRequestException } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { AuthGuard } from '../common/auth.guard';
import { CartItem } from './entities/cart.item.entity';
import { CouponService } from 'src/coupons/coupons.service';
import { GiftCardService } from 'src/gitfcard/gitfcard.service';

@Controller('api/cart')
@UseGuards(AuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService,
    private readonly couponService: CouponService,
    private readonly giftcardService: GiftCardService,
  ) {}

  // @Post('add')
  // async addToCart(@Req() req, @Body() createCartDto: CreateCartDto) {
  //   const cartItem = {
  //     ...createCartDto,
  //     productId: Number(createCartDto.productId),
  //     quantity: createCartDto.quantity ?? 1,
  //   };
  //   return this.cartService.addToCart(req.user.id, cartItem);
  // }

  @Post('add')
async addToCart(@Req() req, @Body() createCartDto: CreateCartDto) {
  if (!req.user || !req.user.id) {
    throw new BadRequestException('User is not authenticated');
  }
  
  if (!createCartDto.productId) {
    throw new BadRequestException('Product ID is required');
  }

  const cartItem = {
    ...createCartDto,
    productId: Number(createCartDto.productId),
    quantity: createCartDto.quantity && createCartDto.quantity > 0 ? createCartDto.quantity : 1,
  };

  return this.cartService.addToCart(req.user.id, cartItem);
}


@Get()
async getCart(@Req() req) {
  const cartData = await this.cartService.getCart(req.user.id);

  // Ensure cartData?.data is an array before mapping
  const cartItems = Array.isArray(cartData?.data)
    ? cartData.data.map((item: any) => ({
        id: item.id,
        productId: item.product?.id ?? null,
        name: item.product?.name ?? "Unknown Product",
        description: item.product?.description ?? "",
        price: Number(item.product?.price) || 0,
        quantity: item.quantity ?? 1,
        totalItemPrice: (Number(item.product?.price) || 0) * (item.quantity ?? 1), 
        stock: item.product?.stock ?? 0,
        status: item.product?.status ?? "Unavailable",
        imageUrls: item.product?.imageUrls || null,
      }))
    : [];

  return {
    statusCode: 200,
    message: cartItems.length ? "Cart retrieved successfully" : "No data found",
    data: cartItems,
    total: cartData?.total ?? 0,
    totalAmount: cartData?.totalAmount ?? 0,
    flatRate: cartData?.flatRate ?? 50, 
    grandTotal: cartData?.grandTotal ?? 0, 
    couponCode: cartData?.couponCode ?? null, 
    discountAmount: cartData?.discountAmount ?? 0, 
    giftCardCode: cartData?.giftcardCode ?? null,
    giftcardDiscountAmount: cartData?.giftcardDiscountAmount ?? 0,
  };
}

  
  @Delete('remove/:itemId')
  async removeFromCart(
    @Req() req,
    @Param('itemId') itemId: number,
    @Body('quantity') quantity: number = 1
  ) {
    const response = await this.cartService.removeFromCart(req.user, itemId, quantity);
  
    return {
       
      ...response, 
    };
  }
  

  // @Post('checkout')
  // async checkout(@Req() req) {
  //   return this.cartService.checkout(req.user.id);
  // }

  
  @Post('apply-coupon')
  async applyCoupon(@Req() req, @Body() body: { couponCode: string }) {
    if (!req.user?.id) {
      throw new BadRequestException('User is not authenticated');
    }
  
    const cartData = await this.cartService.getCart(req.user.id);
    if (!cartData) throw new NotFoundException('Cart not found');
  
    const grandTotal = cartData.grandTotal ?? cartData.totalAmount + (cartData.flatRate ?? 50);
  
    const coupon = await this.couponService.findByCode(body.couponCode);
    if (!coupon || !coupon.is_active || coupon.expiry_date < new Date()) {
      throw new BadRequestException('Invalid or expired coupon');
    }
  
    if (coupon.usage_limit > 0 && coupon.used_count >= coupon.usage_limit) {
      throw new BadRequestException('Coupon usage limit reached');
    }
  
    if (grandTotal < coupon.min_purchase) {
      throw new BadRequestException(`Minimum purchase of ${coupon.min_purchase} required`);
    }
  
    let discountAmount = coupon.discount_type === 'fixed'
      ? coupon.discount_value
      : (grandTotal * (coupon.discount_percentage / 100));
  
    discountAmount = Math.min(discountAmount, grandTotal);
  
    const updatedCart = await this.cartService.applyCoupon(req.user.id, {
      couponCode: body.couponCode,
      discountAmount,
    });
  
    await this.couponService.incrementUsage(coupon.id);
  
    return { statusCode: 200, message: 'Coupon applied', data: updatedCart };
  }
  @Post('remove-coupon')
  async removeCoupon(@Req() req) {
    if (!req.user?.id) throw new BadRequestException('User not authenticated');
  
    const cartData = await this.cartService.getCart(req.user.id);
    if (!cartData?.couponCode) throw new NotFoundException('No coupon applied');
  
    const updatedCart = await this.cartService.removeCoupon(req.user.id);
    await this.couponService.decrementUsage(cartData.couponCode);
  
    return { statusCode: 200, message: 'Coupon removed', data: updatedCart };
  }
  

  @Post('apply-GiftCard')
  async applyGiftCardToCart(@Req() req, @Body() { giftCardCode }: { giftCardCode: string }) {
    return this.cartService.applyGiftCardToCart(req.user.id, giftCardCode);
  }

  @Delete('remove-giftcard')
async removeGiftCardFromCart(@Req() req) {
    if (!req.user?.id) throw new BadRequestException('User not authenticated');

    // Get cart details and ensure a gift card is applied
    const cartData = await this.cartService.getCart(req.user.id);
    if (!cartData || !cartData.giftcardCode) {
        throw new NotFoundException('No gift card applied');
    }

    // Remove the gift card from the cart
    const updatedCart = await this.cartService.removeGiftCardFromCart(req.user.id);

    return { statusCode: 200, message: 'Gift card removed successfully', data: updatedCart };
}


  
  
}


