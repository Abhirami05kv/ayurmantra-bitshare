// src/coupon/dto/validate-coupon.dto.ts
import { IsString, IsNumber, Min } from 'class-validator';

export class ValidateCouponDto {
  @IsString()
  coupon_code: string;

  @IsNumber()
  @Min(0)
  totalAmount: number;
}
