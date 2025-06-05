// import { IsString, IsNumber, IsDateString, Min, IsOptional, ValidateIf, Max } from 'class-validator';

// export class CreateCouponDto {
//   @IsString()
//   coupon_code: string;

//   @IsString()
//   discount_type: 'fixed' | 'percentage'; // Accept only 'fixed' or 'percentage'

//   @ValidateIf(o => o.discount_type === 'fixed') // Required only for fixed type
//   @IsNumber()
//   @Min(1)
//   discount_value?: number;

//   @ValidateIf(o => o.discount_type === 'percentage') // Required only for percentage type
//   @IsNumber()
//   @Min(1)
//   @Max(100)
//   discount_percentage?: number;

//   @IsDateString()
//   expiry_date: string;

//   @IsOptional()
//   @IsNumber()
//   @Min(0)
//   min_purchase?: number;

//   @IsOptional()
//   @IsNumber()
//   usage_limit?: number;
// }

import { IsString, IsNumber, IsDateString, Min, IsOptional, ValidateIf, Max, IsEnum } from 'class-validator';
import { DiscountType } from '../enums/discount-type.enum';

export class CreateCouponDto {
  @IsString()
  coupon_code: string;

  @IsEnum(DiscountType)
  discount_type: DiscountType; // Enum for selecting discount type

  @ValidateIf(o => o.discount_type === DiscountType.FIXED)
@IsNumber()
@Min(1)
discount_value?: number;

@ValidateIf(o => o.discount_type === DiscountType.PERCENTAGE)
@IsNumber()
@Min(1)
@Max(100)
discount_percentage?: number;


  @IsDateString()
  expiry_date: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  min_purchase?: number;

  @IsOptional()
  @IsNumber()
  usage_limit?: number;
}
