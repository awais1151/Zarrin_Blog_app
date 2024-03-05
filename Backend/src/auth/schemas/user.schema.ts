import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export enum Role{
    ISADMIN='admin',
    ISWRITER='writer',
    ISUSER='user'

}


@Schema({
    timestamps:true
})

export class User extends Document{
    @Prop()
    name:string
    @Prop()
    image:string

    @Prop({unique:[true,'Duplicate email enterd']})
    email:string

    @Prop()
    password:string

    @Prop({default:'user'})
    role:Role



    
}

export const UserSchema=SchemaFactory.createForClass(User)