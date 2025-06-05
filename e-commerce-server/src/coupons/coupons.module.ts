import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from './entities/coupon.entity';  // Assuming you're using 'Coupon' entity
import { CouponService } from './coupons.service';  // Fix the service name here
import { CouponController } from './coupons.controller';  // Fix the controller name here

@Module({
  imports: [TypeOrmModule.forFeature([Coupon])],
  providers: [CouponService],
  controllers: [CouponController],
  exports: [CouponService, TypeOrmModule],
})
export class CouponModule {}  
