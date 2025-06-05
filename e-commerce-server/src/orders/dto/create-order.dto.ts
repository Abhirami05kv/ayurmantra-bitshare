import { IsString, IsArray, ValidateNested, IsInt, IsOptional, IsNotEmpty, IsEnum, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { PaymentMethod } from '../entities/order.entity';
import { ShippingAddressDto } from './shipping.address.dto';

class ProductOrderDto {
  
    // @IsNotEmpty({ message: 'Product ID is required' })
    // @IsNumber({}, { message: 'Product ID must be a number' })
    // id: number;
  
    // @IsNotEmpty({ message: 'Quantity is required' })
    // @IsNumber({}, { message: 'Quantity must be a number' })
    // @Min(1, { message: 'Quantity must be at least 1' })
    // quantity: number;
  }
  


export class CreateOrderDto {
   @IsNotEmpty()
  @IsEnum(PaymentMethod, { message: 'Invalid payment method' }) 
  paymentMethod: PaymentMethod;

  // @IsNotEmpty({ message: 'Products list cannot be empty' })
  // @IsArray({ message: 'Products must be an array' })
  // @ValidateNested({ each: true })
  // @Type(() => ProductOrderDto)
  // products: ProductOrderDto[];

  @IsNotEmpty({ message: 'Shipping address is required' })
  @ValidateNested()
  @Type(() => ShippingAddressDto)
  shippingAddress: ShippingAddressDto;

  @IsOptional()
  @IsString()
  couponCode?: string;

  @IsOptional()
  @IsString()
  giftCardCode?: string;


  @IsString()
    @IsOptional()
    razorpayOrderId?: string;
}


