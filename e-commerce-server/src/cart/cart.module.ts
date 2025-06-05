import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart } from '../cart/entities/cart.entity';
import { CartItem } from './entities/cart.item.entity';
import { Product } from 'src/products/entities/product.entity';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/auth/entities/auth.entity';
import { CouponModule } from '../coupons/coupons.module';
import { GiftCard } from 'src/gitfcard/entities/gift-card.entity';
import { GiftCardPurchase } from 'src/gitfcard/entities/gift-card-purchase.entity';
import { GiftCardModule } from 'src/gitfcard/gitfcard.module';


@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartItem, Product, User,GiftCard,GiftCardPurchase]), forwardRef(() => AuthModule),
  forwardRef(() => UsersModule),
  forwardRef(() => CouponModule),
  forwardRef(() => GiftCardModule),], 
  providers: [CartService],    
  exports: [ CartService, TypeOrmModule, CouponModule],      
  controllers: [CartController],
})
export class CartModule {}

