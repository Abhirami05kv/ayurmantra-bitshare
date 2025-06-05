import { IsNumber, IsOptional, IsString, IsDate, IsPositive } from "class-validator";
import { Type } from "class-transformer";

export class UpdateGiftCardDto {
  @IsOptional()
  @IsString()
  description?: string;  

  @IsOptional()
  @IsString()
  title?: string;

  @IsNumber()
   @IsPositive()
   @Type(() => Number)
   purchaseAmount: number;
 
   @IsNumber()
   @IsPositive()
   @Type(() => Number)
   usableAmount: number;
  // @IsOptional()
  // @Type(() => Date)  
  // @IsDate()
  // expiryDate?: Date; 

  @IsOptional()
  @IsString()
  image?: string;
}
