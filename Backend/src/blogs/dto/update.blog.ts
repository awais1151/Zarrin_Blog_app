import { IsOptional, IsString } from "class-validator";
import { User } from "../../auth/schemas/user.schema";
import { Category } from "../../category/schemas/category.schema";
import { Comment } from "../../comment/schemas/comment.schema";
import { Reaction } from "../../reaction/schemas/reaction.schema";
import { ApiProperty } from "@nestjs/swagger";



export  class UpdateBlogDto{
    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly title:string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly content:string;

    @ApiProperty()
    readonly  user:User

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly  category:Category

    @ApiProperty()
    readonly reaction:Reaction

    @ApiProperty()
    readonly comments:Comment[]
}