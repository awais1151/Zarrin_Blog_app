import { ApiProperty } from "@nestjs/swagger";
import {  IsOptional, IsString } from "class-validator";
import { User } from "../../auth/schemas/user.schema";
import { Blog } from "../../blogs/schemas/blog.schema";


export  class UpdateCommentDto{

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly comment:string;

    @ApiProperty()
    readonly  user:User

    @ApiProperty()
    readonly  blog:Blog
}