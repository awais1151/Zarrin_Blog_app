import { Body, Controller, Delete, Get, Param, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { Blog } from './schemas/blog.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateBlogDto } from './dto/create-blog';
import { UpdateBlogDto } from './dto/update.blog';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/schemas/user.schema';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('blogs')
export class BlogsController {
    constructor(
        private blogsService:BlogsService
    ){}

@Get()
async getAllBlogs():Promise<Blog[]>{
    return await this.blogsService.findAll()
}


@Post('')
@UseInterceptors(FileInterceptor('file'))
@UseGuards(JwtAuthGuard,RolesGuard)
@Roles(Role.ISWRITER)
async createBlog(
    @Body()
    blog:CreateBlogDto,
    @Req()
    req,
    @UploadedFile() file: Express.Multer.File    


): Promise<Blog> {
    // console.log(Blog.name)

    const imageData= await this.blogsService
    .uploadImage(file)
    .then((data) => {
      return {
        statusCode: 200,
        data: data.secure_url,
      };
    })
    .catch((err) => {
      return {
        statusCode: 400,
        message: err.message,
      };
    });
    return this.blogsService.create(blog,req.user,imageData)
}


@Get(':id')
async getBlogs(@Param('id') id:string):Promise<Blog>{
    return await this.blogsService.findById(id)
}


@Put(':id')
@UseGuards(JwtAuthGuard,RolesGuard)
@Roles(Role.ISWRITER)
async UpdateBlog(
    @Param('id') 
    id:string,
    @Body()
    blog:UpdateBlogDto,
    @Req()
    req:any
): Promise<Blog> {
    console.log(Blog.name)
    return this.blogsService.updateById(id,blog,req.user)
}


@Delete(':id')
@UseGuards(JwtAuthGuard,RolesGuard)
@Roles(Role.ISWRITER,Role.ISADMIN)
async delBlogs(
    @Param('id') id:string,

    @Req()
    req
    ):Promise<Blog>{
    return await this.blogsService.deleteById(id,req.user);
}


@Post('online')
  @UseInterceptors(FileInterceptor('file'))
  async online(@UploadedFile() file: Express.Multer.File) {
    return await this.blogsService
      .uploadImage(file)
      .then((data) => {
        return {
          statusCode: 200,
          data: data.secure_url,
        };
      })
      .catch((err) => {
        return {
          statusCode: 400,
          message: err.message,
        };
      });
  }



}
