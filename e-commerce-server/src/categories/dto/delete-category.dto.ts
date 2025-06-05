import { IsNotEmpty, IsString } from "class-validator";

export class deleteCategoryDto{

    @IsNotEmpty()
    @IsString()
    reason?: string;
}