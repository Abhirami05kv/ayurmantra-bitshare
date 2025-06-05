import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart.item.entity';
import { Product } from '../products/entities/product.entity';
import { User } from 'src/auth/entities/auth.entity';
import { CreateCartItemDto } from '../cart/dto/create-cart.item.dto';
import { Coupon } from 'src/coupons/entities/coupon.entity';
import { GiftCard } from 'src/gitfcard/entities/gift-card.entity';
import { CouponService } from 'src/coupons/coupons.service';
import { GiftCardService } from 'src/gitfcard/gitfcard.service';
import { GiftCardPurchase } from 'src/gitfcard/entities/gift-card-purchase.entity';

@Injectable()
export class CartService {
 
  constructor(
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    @InjectRepository(CartItem) private cartItemRepo: Repository<CartItem>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(GiftCard) private giftcardtRepo: Repository<GiftCard>,
    @InjectRepository(GiftCardPurchase) private giftCardPurchaseRepo: Repository<GiftCardPurchase>,
    // @InjectRepository(Coupon) private couponRepo: Repository<Coupon>,
    //  @InjectRepository(Coupon)
    //     private couponRepository: Repository<Coupon>,
    //     @InjectRepository(GiftCard)
    //         private readonly giftCardRepository: Repository<GiftCard>,
    // private dataSource: DataSource,
    // private readonly couponService: CouponService,
    // private readonly giftCardService: GiftCardService,
    
  ) {}
  async getCart(userId: number) {
  
    const cart = await this.cartRepo.findOne({
        where: { user: { id: userId } },
        relations: ['items', 'items.product'], 
        select: ['id', 'totalAmount', 'grandTotal', 'discountAmount', 'couponCode', 'giftcardCode','giftcardDiscountAmount'], // ✅ Fetch `giftcardCode` directly
    });

   
    if (!cart || !cart.items || cart.items.length === 0) {
        return {
            data: [],
            total: 0,
            totalAmount: 0,
            flatRate: 50,
            grandTotal: 0,
            couponCode: null,
            discountAmount: 0,
            giftcardCode: null,
            giftcardDiscountAmount:0 
        };
    }

    const cartItems = cart.items.map(item => ({
        id: item.id,
        product: {
            id: item.product?.id || null,
            name: item.product?.name || 'Unknown',
            description: item.product?.description || '',
            price: item.product?.price || 0,
            status: item.product?.status || 'Unavailable',
            imageUrls: item.product?.imageUrls || null,
            stock: item.product?.stock > 0 ? item.product?.stock : 'Out of Stock',
        },
        quantity: item.quantity,
        itemTotal: Number(item.product?.price || 0) * item.quantity,
    }));

   
    const discountAmount = cart.discountAmount ?? 0;
    const couponCode = cart.couponCode ?? null;
    const giftcardCode = cart.giftcardCode ?? null;
    const giftcardDiscountAmount = cart.giftcardDiscountAmount ?? 0;

   
    const grandTotal = cart.grandTotal ?? 0;

    return {
        data: cartItems,
        total: cartItems.length,
        totalAmount: cart.totalAmount, 
        flatRate: 50,
        grandTotal, 
        couponCode,
        discountAmount,
        giftcardCode,
        giftcardDiscountAmount 
    };
}




  
  

  async addToCart(userId: number, createCartItemDto: CreateCartItemDto) {
    console.log('addToCart function started');
    console.log('User ID:', userId);
    console.log('Product ID:', createCartItemDto.productId);
    console.log('Requested Quantity:', createCartItemDto.quantity);

    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

  
    const product = await this.productRepo.findOne({ 
      where: { id: Number(createCartItemDto.productId) },
      select: ['id', 'name', 'description', 'price', 'stock', 'status', 'imageUrls']
    });

    if (!product) throw new NotFoundException('Product not found');
    if (product.stock < createCartItemDto.quantity) {
      throw new BadRequestException('Product is out of stock.');
    }

  
    let cart = await this.cartRepo.findOne({ 
      where: { user: { id: userId } }, 
      relations: ['items', 'items.product'] 
    });

    if (!cart) {
      cart = this.cartRepo.create({ 
        user, 
        totalAmount: 0, 
        grandTotal: 0, 
        items: [] 
      });
      await this.cartRepo.save(cart);
    }

    let cartItem = await this.cartItemRepo.findOne({
      where: { cart: { id: cart.id }, product: { id: product.id } },
      relations: ['cart', 'product'], 
    });

    console.log('Cart Item Found:', cartItem ? cartItem.id : 'None');
    console.log('Cart ID:', cart.id); 
    console.log('Product ID:', product.id);

    if (cartItem) {
   
      cartItem.quantity += createCartItemDto.quantity;
      console.log('Updated Quantity Before Save:', cartItem.quantity);
      await this.cartItemRepo.save(cartItem);
    } else {
     
      cartItem = this.cartItemRepo.create({
        cart,
        user,
        product,
        quantity: createCartItemDto.quantity || 1,
        price: product.price,
      });
      await this.cartItemRepo.save(cartItem);
      cart.items.push(cartItem); 
    }

  
    cart.items = await this.cartItemRepo.find({ where: { cart: { id: cart.id } }, relations: ['product'] });

 
    const existingGrandTotal = cart.grandTotal ?? 0;
    const existingDiscount = cart.discountAmount ?? 0;


    cart.totalAmount = cart.items.reduce(
      (acc, item) => acc + ((Number(item.product?.price) || 0) * (item.quantity || 1)),
      0
    );


    const flatRate = 50;
    cart.grandTotal = cart.totalAmount + flatRate - existingDiscount;

    await this.cartRepo.save(cart);

    return {
      message: 'Cart updated successfully',
      data: cart.items.map(item => ({
        id: item.id,
        product: {
          id: item.product?.id || 0,
          name: item.product?.name || 'Unknown',
          description: item.product?.description || '',
          price: item.product?.price || 0,
          status: item.product?.status,
          imageUrl: item.product?.imageUrls, 
        },
        quantity: item.quantity || 1,  
      })),
      totalAmount: cart.totalAmount,
      flatRate, 
      grandTotal: cart.grandTotal, 
      couponCode: cart.couponCode ?? null, 
      discountAmount: cart.discountAmount ?? 0, 
    };
}



  async removeFromCart(user: User, itemId: number, quantity: number = 1) {
    const cartItem = await this.cartItemRepo.findOne({
      where: { id: itemId, cart: { user: { id: user.id } } },  
      relations: ['cart'],
    });
  
    if (!cartItem) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Cart item not found.',
      });
    }
  
    cartItem.quantity -= quantity;
  
    if (cartItem.quantity <= 0) {
      await this.cartItemRepo.remove(cartItem);
      return {
        statusCode: 200,
        message: 'Item completely removed from cart.',
      };
    } else {
      await this.cartItemRepo.save(cartItem);
      return {
        statusCode: 200,
        message: `Reduced quantity. Remaining: ${cartItem.quantity}`,
        data: {
          itemId: cartItem.id,
          remainingQuantity: cartItem.quantity,
        },
      };
    }
  }
  

async removeOrderedItems(userId: number, productIds: number[]): Promise<void> {
  // Ensure user ID is valid
  if (!userId) {
    throw new BadRequestException('User ID is required.');
  }

  
  await this.cartItemRepo.createQueryBuilder()
  .delete()
  .from(CartItem)
  .where("userId = :userId", { userId })
  .andWhere("productId IN (:...productIds)", { productIds }) 
  .execute();



  console.log(`Removed ordered items from cart for user ID: ${userId}`);
}



  async applyCoupon(userId: number, couponData: { couponCode: string; discountAmount: number }) {
  const cart = await this.cartRepo.findOne({
    where: { user: { id: userId } },
    relations: ['user'], // Ensure relation is included
  });

  if (!cart) throw new NotFoundException('Cart not found');

  
  if (cart.couponCode) {
    throw new BadRequestException('A coupon is already applied. Remove it before applying a new one.');
  }

  
  cart.couponCode = couponData.couponCode;
  cart.discountAmount = couponData.discountAmount;
  cart.grandTotal -= couponData.discountAmount;

  await this.cartRepo.save(cart);

  return {
    message: 'Coupon applied successfully',
    grandTotal: cart.grandTotal,
    discountAmount: cart.discountAmount,
    couponCode: cart.couponCode,
  };
}

  async removeCoupon(userId: number) {
    
    const cart = await this.cartRepo.findOne({
      where: { user: { id: userId } },
      relations: ['items', 'items.product'],
    });
  
    if (!cart) throw new NotFoundException('Cart not found');
    if (!cart.couponCode) throw new BadRequestException('No coupon applied');
  
    
    cart.couponCode = null;
    cart.discountAmount = 0;
    const flatRate = 50;
  
   
    cart.grandTotal = parseFloat((cart.totalAmount + flatRate).toFixed(2));
  
    
    await this.cartRepo.save(cart);
  
    return {
      message: 'Coupon removed successfully',
      grandTotal: cart.grandTotal,
      couponCode: null,
      discountAmount: 0,
    };
  }
  
 

  
  async applyGiftCardToCart(userId: number, giftCardCode: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const cart = await this.cartRepo.findOne({ 
      where: { user: { id: userId } },
      relations: ['user'], 
    });
    if (!cart) throw new NotFoundException('Cart not found');

   
    const giftCardPurchase = await this.giftCardPurchaseRepo.findOne({
      where: { uniquecode: giftCardCode },
      relations: ['giftCard'],
    });

    if (!giftCardPurchase) throw new NotFoundException('Invalid gift card code');
    if (giftCardPurchase.status === 'redeemed') throw new BadRequestException('Gift card already redeemed');
    if (!giftCardPurchase.giftCard) throw new BadRequestException('Gift card not found');
    if (giftCardPurchase.giftCard.balance <= 0) throw new BadRequestException('Gift card has no balance');

    const cartTotal = parseFloat(cart.grandTotal?.toString() || '0');
    if (cartTotal <= 0) throw new BadRequestException('Cart total amount must be greater than 0');

   
    const discountAmount = Math.min(parseFloat(giftCardPurchase.giftCard.balance.toString()), cartTotal);

   
    giftCardPurchase.giftCard.balance = parseFloat((giftCardPurchase.giftCard.balance - discountAmount).toFixed(2));
    
    
    if (giftCardPurchase.giftCard.balance <= 0) {
        giftCardPurchase.status = 'redeemed';
        giftCardPurchase.giftCard.is_redeemed = true;
    }

    
    giftCardPurchase.redeemedByUserId = userId; 

   
    cart.giftcardDiscountAmount = discountAmount;
    cart.giftcardCode = giftCardCode;
    cart.grandTotal = parseFloat((cart.grandTotal - discountAmount).toFixed(2));

    await this.giftcardtRepo.save(giftCardPurchase.giftCard); 
    await this.giftCardPurchaseRepo.save(giftCardPurchase);
    await this.cartRepo.save(cart);

    return {
        message: 'Gift card applied successfully',
        discountApplied: discountAmount,
        remainingBalance: giftCardPurchase.giftCard.balance,
        grandTotal: cart.grandTotal,
        redeemedBy: userId, 
    };
}

  

  /**
   * Remove Gift Card from Cart
   */
  async removeGiftCardFromCart(userId: number) {
    const cart = await this.cartRepo.findOne({
        where: { user: { id: userId } },
    });

    if (!cart) throw new NotFoundException('Cart not found');
    if (!cart.giftcardCode) throw new BadRequestException('No gift card applied');

    // Retrieve the previously deducted gift card amount
    const previousGiftcardDiscount = cart.giftcardDiscountAmount || 0;

    // Reset the gift card-related fields
    cart.giftcardCode = null;
    cart.giftcardDiscountAmount = 0;

    // Restore the grand total by adding back the deducted amount
    // cart.grandTotal = parseFloat((cart.grandTotal + previousGiftcardDiscount).toFixed(2));
    cart.grandTotal = Number((Number(cart.grandTotal) + Number(previousGiftcardDiscount)).toFixed(2));



//     const grandTotal = Number(cart.grandTotal) || 0;
// const giftcardDiscount = Number(previousGiftcardDiscount) || 0;
// const updatedTotal = (Number(cart.grandTotal) + Number(previousGiftcardDiscount)).toFixed(2);

    await this.cartRepo.save(cart);

    return {
        message: 'Gift card removed successfully',
        grandTotal: cart.grandTotal, 
        giftcardCode: null,
        giftcardDiscountAmount: 0,
    };
}


}