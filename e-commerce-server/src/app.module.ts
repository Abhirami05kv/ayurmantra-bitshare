import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthModule } from './auth/auth.module';
import { CouponModule } from './coupons/coupons.module';
import { Coupon } from './coupons/entities/coupon.entity';
import { UsersModule } from './users/users.module';
import { Category } from './categories/entities/category.entity';
import { Product } from './products/entities/product.entity';
import { User } from './auth/entities/auth.entity';
import { Order } from './orders/entities/order.entity';
import { Cart } from './cart/entities/cart.entity';
import { CartItem } from './cart/entities/cart.item.entity';
import { SrcController } from './src/src.controller';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { PaymentModule } from './payment/payment.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DashboardController } from './dashboard/dashboard.controller';
import { DashboardService } from './dashboard/dashboard.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { OrderItem } from './orders/entities/order-item.entity';
import { UsersService } from './users/users.service';
import { CartService } from './cart/cart.service';
import { Address } from './auth/entities/address.entity';
import { OrderReturnRequest } from './orders/order-return-request.entity';
import { Notification } from './notification/entities/notification.entity';
import { NotificationModule } from './notification/notification.module';
import { GiftCard } from './gitfcard/entities/gift-card.entity';
import { GiftCardService } from './gitfcard/gitfcard.service';
import { GiftCardController } from './gitfcard/gitfcard.controller';
import { GiftCardModule } from './gitfcard/gitfcard.module';
import { GiftCardPurchase } from './gitfcard/entities/gift-card-purchase.entity';
import { NotificationController } from './notification/notification.controller';
import { NotificationService } from './notification/notification.service';
import { FirebaseAdminService } from './notification/FirebaseAdminService';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env',
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      type: 'postgres',
      entities: [
        Category,
        Product,
        User,
        Coupon,
        Order,
        OrderItem,
        Cart,
        CartItem,
        Address,
        OrderReturnRequest,
        Notification,
        GiftCard,
      ],
      synchronize: true,
      autoLoadEntities: true, 
      logging: true,
      logger: 'advanced-console',
    }),

    TypeOrmModule.forFeature([
      Category,
      Product,
      User,
      Coupon,
      Order,
      OrderItem,
      Cart,
      CartItem,
      OrderReturnRequest,
      Notification,
      GiftCard,
      GiftCardPurchase,
    ]),

    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          let uploadPath = './uploads/products';
          if (file.fieldname === 'giftCardImage') {
            uploadPath = './uploads/gift-cards';
          }
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(
            null,
            file.fieldname +
              '-' +
              uniqueSuffix +
              '.' +
              file.originalname.split('.').pop(),
          );
        },
      }),
      limits: { fileSize: 1024 * 1024 * 10 },
    }),


    CouponModule,
    UsersModule,
    CartModule,
    AuthModule,
    OrdersModule,
    ProductsModule,
    CategoriesModule,
    PaymentModule,
    DashboardModule,
    NotificationModule,
    GiftCardModule,
  ],
  controllers: [SrcController, DashboardController, GiftCardController, NotificationController],
  providers: [DashboardService, UsersService, CartService, GiftCardService, NotificationService , FirebaseAdminService],
})
export class AppModule implements OnModuleInit {
  constructor(private configService: ConfigService) {}

  // This lifecycle hook runs once the module is initialized
  onModuleInit() {
    // Fetch the DATABASE_URL or individual components to log
    const databaseUrl = this.configService.get<string>('DB_URL');
    console.log('Database URL:', databaseUrl); // Log the database URL to the console

    // If you want to log individual components of the URL, like username and database name:
    const dbHost = this.configService.get<string>('DB_HOST');
    const dbPort = this.configService.get<number>('DB_PORT');
    const dbName = this.configService.get<string>('DB_NAME');

    console.log(
      `Connecting to database at ${dbHost}:${dbPort}, using database ${dbName}`,
    );
  }
}
