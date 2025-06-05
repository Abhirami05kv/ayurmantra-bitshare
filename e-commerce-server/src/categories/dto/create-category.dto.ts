import { IsNotEmpty, IsString, IsBoolean } from "class-validator";

export class CreateCategoryDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

 @IsNotEmpty()
 status: string;
  isactive: boolean;
}
