import { IsNotEmpty, IsNumber, IsOptional,  Min } from 'class-validator';

export class CreateCartDto {
  
  @IsNotEmpty()
  productId: number;

  @IsOptional()                
  @IsNumber()                  
  @Min(1)                      
  quantity?: number;
}

