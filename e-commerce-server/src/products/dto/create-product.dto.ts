import { Transform, Type } from 'class-transformer';
import { IsString, IsNumber, IsArray, IsOptional, IsNotEmpty } from 'class-validator';
import { FindOperator } from 'typeorm';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(()=>Number)
  stock: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString({ each: true }) 
  imageUrls?: string;

  status?: string; 

  @IsNumber()
  @IsNotEmpty()
  @Type(()=>Number)
  categoryId: number; 
}

