import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class LoginDto{

     
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail({},{message:"Please enter correct email"})
    readonly   email:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly  password:string;
}