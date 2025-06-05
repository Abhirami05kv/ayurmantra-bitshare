import { 
  IsString, 
  IsNumber, 
  IsDateString, 
  IsOptional, 
  Min, 
  Max, 
  ValidateIf, 
  IsIn 
} from 'class-validator';

export class UpdateCouponDto {
  @IsOptional()
  @IsString()
  coupon_code?: string;

  @IsOptional()
  @IsIn(['fixed', 'percentage'], { message: 'discount_type must be either "fixed" or "percentage".' })
  discount_type?: string;

  @IsOptional()
  @IsDateString()
  expiry_date?: string;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'min_purchase must be at least 0.' })
  min_purchase?: number;

  @IsOptional()
  @IsNumber()
  @Min(1, { message: 'usage_limit must be at least 1.' })
  usage_limit?: number;

  @ValidateIf(o => o.discount_percentage === undefined)
  @IsOptional()
  @IsNumber()
  @Min(1, { message: 'discount_value must be at least 1.' })
  discount_value?: number;

  @ValidateIf(o => o.discount_value === undefined)
  @IsOptional()
  @IsNumber()
  @Min(1, { message: 'discount_percentage must be at least 1.' })
  @Max(100, { message: 'discount_percentage cannot exceed 100.' })
  discount_percentage?: number;
}
