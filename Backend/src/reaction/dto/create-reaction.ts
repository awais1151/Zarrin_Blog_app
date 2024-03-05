import { IsEnum } from "class-validator";
import { User } from "../../auth/schemas/user.schema";
import { Blog } from "../../blogs/schemas/blog.schema";
import { ReactionType } from "../schemas/reaction.schema";
import { ApiProperty } from "@nestjs/swagger";

 

export  class CreateReactionDto{

    @ApiProperty()
    @IsEnum(ReactionType)
    readonly reactionType:ReactionType


    @ApiProperty()
    readonly  user:User

    @ApiProperty()
    readonly  blog:Blog

}