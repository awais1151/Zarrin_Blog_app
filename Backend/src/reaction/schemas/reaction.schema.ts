import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { User } from "../../auth/schemas/user.schema";
import { Blog } from "../../blogs/schemas/blog.schema";

export enum ReactionType{

    LIKE = "satisfaction",
    FUNNY = "happy",
    SAD = "sad",
    LOVE = "love",
    ANGRY = 'angry',
    SURPRISE ='surprise'

}

@Schema({
    timestamps:true
})

export class Reaction extends Document {


    @Prop()
    reactionType:ReactionType

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:"Blog"})
    blog:Blog

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:"User"})
    user:User  
    
}

export const ReactionSchema=SchemaFactory.createForClass(Reaction)