import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';


export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @IsNotEmpty()
  @IsString()
  name?: string; 
  
  @IsNotEmpty()
  @IsString()
  description?: string; 
   

  status?: string;
}
