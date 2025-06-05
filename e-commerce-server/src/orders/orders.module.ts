// // import { Module } from '@nestjs/common';
// // import { OrderService } from './orders.service';
// // import { OrderController } from './orders.controller';
// // import { TypeOrmModule } from '@nestjs/typeorm';
// // import { Order} from './entities/order.entity';
// // import { User } from 'src/auth/entities/auth.entity';
// // import { CartModule } from 'src/cart/cart.module';
// // import { Address } from 'src/auth/entities/address.entity';
// // import { Cart } from 'src/cart/entities/cart.entity';
// // import { OrderItem } from './entities/order-item.entity';
// // import { PaymentModule } from 'src/payment/payment.module';
// // import { Product } from 'src/products/entities/product.entity';
// // import { forwardRef } from '@nestjs/common';
// // import { CartService } from 'src/cart/cart.service';
// // import { PaymentService } from 'src/payment/payment.service';

// // @Module({
// //   imports: [
// //     TypeOrmModule.forFeature([Order, OrderItem, User,Cart, Address,Product]), 
// //     forwardRef(() => CartModule),
// //     forwardRef(() => PaymentModule),
// //   ],
// //   controllers: [OrderController], 
// //   providers: [OrderService, CartService, PaymentService],
// //   exports: [OrderService,TypeOrmModule], 
// // })
// // export class OrdersModule {}


// import { Module, forwardRef } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { OrderService } from './orders.service';
// import { OrderController } from './orders.controller';
// import { Order } from './entities/order.entity';
// import { User } from 'src/auth/entities/auth.entity';
// import { CartModule } from 'src/cart/cart.module';
// import { Address } from 'src/auth/entities/address.entity';
// import { Cart } from 'src/cart/entities/cart.entity';
// import { OrderItem } from './entities/order-item.entity';
// import { PaymentModule } from 'src/payment/payment.module';
// import { Product } from 'src/products/entities/product.entity';
// import { CartService } from 'src/cart/cart.service';
// import { PaymentService } from 'src/payment/payment.service';
// import { Coupon } from 'src/coupons/entities/coupon.entity';
// import { OrderReturnRequest } from './order-return-request.entity';
// import { GiftCard } from 'src/gitfcard/entities/gift-card.entity';


// @Module({
//   imports: [
//     TypeOrmModule.forFeature([Order, OrderItem, User,Cart, Address,Product, Coupon,OrderReturnRequest]), 
//     forwardRef(() => CartModule),
//     forwardRef(() => PaymentModule),
   
   
//   ],
//   controllers: [OrderController],
//   providers: [OrderService, CartService, PaymentService], 
//   exports: [OrderService, TypeOrmModule],
// })
// export class OrdersModule {}


import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './orders.service';
import { OrderController } from './orders.controller';
import { Order } from './entities/order.entity';
import { User } from 'src/auth/entities/auth.entity';
import { CartModule } from 'src/cart/cart.module';
import { Address } from 'src/auth/entities/address.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { OrderItem } from './entities/order-item.entity';
import { PaymentModule } from 'src/payment/payment.module';
import { Product } from 'src/products/entities/product.entity';
import { CartService } from 'src/cart/cart.service';
import { PaymentService } from 'src/payment/payment.service';
import { Coupon } from 'src/coupons/entities/coupon.entity';
import { OrderReturnRequest } from './order-return-request.entity';
import { GiftCard } from 'src/gitfcard/entities/gift-card.entity'; // Import the GiftCard entity
import { GiftCardModule } from 'src/gitfcard/gitfcard.module';
import { NotificationModule } from 'src/notification/notification.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      OrderItem,
      User,
      Cart,
      Address,
      Product,
      Coupon,
      OrderReturnRequest,
      GiftCard, // Add GiftCard entity here
    ]),
    forwardRef(() => CartModule),
    forwardRef(() => PaymentModule),
    GiftCardModule, NotificationModule
  ],
  controllers: [OrderController],
  providers: [OrderService, CartService, PaymentService],
  exports: [OrderService, TypeOrmModule],
})
export class OrdersModule {}