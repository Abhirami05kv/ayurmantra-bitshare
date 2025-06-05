import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class PurchaseGiftCardDto {
  @IsNumber()
  @IsNotEmpty()
  giftCardId: number;

  @IsString()
  paymentMethod: string;

  
}
