import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schemas/category.schema';
import mongoose from 'mongoose';
import {Query} from 'express-serve-static-core'
import { CreateCategoryDto } from './dto/create-category';
import { UpdateCategoryDto } from './dto/update-category';
@Injectable()
export class CategoryService {

    constructor(
        @InjectModel(Category.name)
        private categoryModel:mongoose.Model<Category>
    ){}
    
    async findAll(query:Query):Promise<Category[]>{

        const Keyword=query.Keyword ? {
            title:{
                $regex:query.Keyword,
                $options: 'i'
            }
        } :{}
        const category=await this.categoryModel.find({...Keyword});
        return category;
    }
    
    
    async create(category:CreateCategoryDto):Promise<Category>{
        const data=Object.assign(category)
        const res =await this.categoryModel.create(data)
        return res;
    }
    
     
    
    async updateById(id:string, category:UpdateCategoryDto):Promise<Category>{
         
        
        return await this.categoryModel.findByIdAndUpdate(id,category,{
            new:true,
            runValidators:true
        });
    }
    
    async deleteById(id:string):Promise<Category>{
        return await this.categoryModel.findByIdAndDelete(id);
        
    }
}
