import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from './schemas/blog.schema';
import mongoose from 'mongoose';
import { User } from '../auth/schemas/user.schema';
import { CreateBlogDto } from './dto/create-blog';
import { UpdateBlogDto } from './dto/update.blog';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
// import { File } from 'buffer';
@Injectable()
export class BlogsService {

constructor(
    @InjectModel(Blog.name)
    private blogModel:mongoose.Model<Blog>
){}

async findAll():Promise<Blog[]>{
    const blogs=(await this.blogModel.find().populate('category reaction').populate('user','-password'));
    return blogs;
}


async create(blog:CreateBlogDto,user:User ,imageData):Promise<Blog>{
   

    const data=Object.assign(blog,{user:user._id,image:imageData.data})
    const res =await this.blogModel.create(data)
    return res;
}

async findById(id:string): Promise<Blog>{
    const isValidId=mongoose.isValidObjectId(id)
    if(!isValidId){
        throw new BadRequestException("please enter a correct ID")
    }
    const blog= await this.blogModel.findById(id).populate('comments category reaction').populate({
      path: 'comments',
      populate: {
          path: 'user',
          model: 'User',
          select: '-password'
      },
  })
    if(!blog){
        throw new BadRequestException("Blogs Not Found")
    }
    return blog;
}

async updateById(id:string, blog:UpdateBlogDto,user:User):Promise<Blog>{
     
    const getblog =await this.findById(id)
    if(getblog.user.toString() !== user._id.toString()){
        throw new UnauthorizedException('Not Authorized')
    }
    return await this.blogModel.findByIdAndUpdate(id,blog,{
        new:true,
        runValidators:true
    });
}

async deleteById(id:string,user:User):Promise<Blog>{
console.log(user.role);
const blog = await this.blogModel.findById(id);
console.log(blog.user._id.toString(),user._id.toString());
   if(user.role === 'admin' || (blog.user._id.toString() === user._id.toString())){
    
      return  await this.blogModel.findByIdAndDelete(id);
   }
   
   if(blog.user._id !== user._id){
    throw new UnauthorizedException('Not Allowed')
   }
    return  await this.blogModel.findByIdAndDelete(id);
    
    
}



async uploadImage(
    fileName: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      v2.config({
        cloud_name: 'dyvs1yt5s',
        api_key: '188848741915724',
        api_secret: '3kew-OciRLbFAPCtPtb81KYtu9Y',
      });
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      toStream(fileName.buffer).pipe(upload);
    });
  }

}
