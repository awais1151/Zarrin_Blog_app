import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { User } from "../../auth/schemas/user.schema";
import { Blog } from "../../blogs/schemas/blog.schema";



@Schema({
    timestamps:true
})

export class Comment extends Document {
    @Prop()
    comment:string;

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:"Blog"})
    blog:Blog

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:"User"})
    user:User  
}

export const CommentSchema=SchemaFactory.createForClass(Comment)