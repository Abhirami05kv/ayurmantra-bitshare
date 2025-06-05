import { Test, TestingModule } from '@nestjs/testing';
import { CouponController } from './coupons.controller';
import { CouponService } from './coupons.service';

describe('CouponsController', () => {
  let controller: CouponController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CouponController],
      providers: [CouponService],
    }).compile();

    controller = module.get<CouponController>(CouponController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
