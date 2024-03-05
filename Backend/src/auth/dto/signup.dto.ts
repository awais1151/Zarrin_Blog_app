import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator"

export enum Role{
    ISADMIN='admin',
    ISWRITER='writer',
    ISUSER='user'

}

export class SignUpDto{

    readonly image:string
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly name:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail({},{message:"Please enter correct email"})
    readonly   email:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly  password:string;

    @ApiProperty()
     @IsEnum(Role)
    readonly role:Role
    
}