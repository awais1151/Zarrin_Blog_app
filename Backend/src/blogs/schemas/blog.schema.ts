import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { User } from "../../auth/schemas/user.schema";
import { Category } from "../../category/schemas/category.schema";
import { Comment } from "../../comment/schemas/comment.schema";
import { Reaction } from "../../reaction/schemas/reaction.schema";



@Schema({
    timestamps:true
})

export class Blog extends Document{
    @Prop()
    title:string;

    @Prop()
    content:string;

    @Prop()
    image:string;

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:"User"})
    user:User   

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:"Category"})
    category:Category

    @Prop([{type:mongoose.Schema.Types.ObjectId,ref:"Comment"}])
    comments:Comment[]

    @Prop([{type:mongoose.Schema.Types.ObjectId,ref:"Reaction"}])
    reaction:Reaction[]   


}

export  const BlogSchema= SchemaFactory.createForClass(Blog)