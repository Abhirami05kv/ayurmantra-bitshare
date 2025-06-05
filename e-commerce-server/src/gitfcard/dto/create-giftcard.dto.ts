import { IsString, IsNumber, IsNotEmpty, IsOptional, IsDate, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateGiftCardDto {
  
  @IsString()
  @IsNotEmpty()
  title: string;

  
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  image:string

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  purchaseAmount: number;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  usableAmount: number;

 
  // @IsNotEmpty()
  // @Type(() => Date)
  // @IsDate()
  // expiryDate: Date;
}