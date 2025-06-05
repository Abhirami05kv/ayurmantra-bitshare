import { IsNotEmpty, IsString } from "class-validator";

export class deleteOrderDto{

    @IsNotEmpty()
    @IsString()
    reason?: string;
}