import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";



@Schema({
    timestamps:true
})

export class Category{
    @Prop()
    title:string;
}

export  const CategorySchema= SchemaFactory.createForClass(Category)