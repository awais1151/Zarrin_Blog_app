import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './schemas/category.schema';
import {Query as ExpressQuery} from 'express-serve-static-core'
import { CreateCategoryDto } from './dto/create-category';
import { UpdateCategoryDto } from './dto/update-category';
@Controller('category')
export class CategoryController {

    constructor(
        private categoryService:CategoryService
    ){}

@Get()
async getAllCategories(@Query() query: ExpressQuery):Promise<Category[]>{
    return await this.categoryService.findAll(query);
}


@Post()
 
async createCategory(
    @Body()
    category:CreateCategoryDto,
    
    
): Promise<Category> {
    console.log(Category.name)
    return this.categoryService.create(category)
}


 


@Put(':id')
 
async UpdateCategory(
    @Param('id') 
    id:string,
    @Body()
    category:UpdateCategoryDto,
    
): Promise<Category> {
    console.log(Category.name)
    return this.categoryService.updateById(id,category)
}


@Delete(':id')
async delCategory(@Param('id') id:string):Promise<Category>{
    return await this.categoryService.deleteById(id);
}


}
