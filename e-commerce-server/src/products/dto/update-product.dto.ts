import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsOptional, IsNotEmpty, IsNumber, IsString, IsArray } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Product name cannot be empty' })
  name?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Description cannot be empty' })
  description?: string;

  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @IsOptional()
  @IsNumber()
  stock?: number;

  @IsArray()
  @IsString()
  @IsOptional()
  image?: string;
  
}


