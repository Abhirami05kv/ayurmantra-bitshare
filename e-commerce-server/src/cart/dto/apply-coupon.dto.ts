import { IsString, IsNotEmpty } from 'class-validator';

export class ApplyCouponDto {
  static couponCode(cartId: number, couponCode: any) {
    throw new Error('Method not implemented.');
  }
  @IsString()
  @IsNotEmpty()
  couponCode: string;
}
