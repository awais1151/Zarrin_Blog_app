import { IsEmpty, IsNotEmpty, IsString } from "class-validator";
import { User } from "../../auth/schemas/user.schema";
import { Category } from "../../category/schemas/category.schema";
import { Comment } from "../../comment/schemas/comment.schema";
import { Reaction } from "../../reaction/schemas/reaction.schema";
import {  ApiProperty } from "@nestjs/swagger";



export  class CreateBlogDto{
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly title:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly content:string;

     @ApiProperty()
    @IsEmpty({message: 'not input user'})

    
    readonly  user:User

    @ApiProperty()
    @IsNotEmpty()
    @IsString()

    readonly  category:Category

    @ApiProperty()
    readonly reaction:Reaction

    @ApiProperty()
    readonly comments:Comment[]

}