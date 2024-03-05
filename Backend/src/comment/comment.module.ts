import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from './schemas/comment.schema';
import { BlogSchema } from '../blogs/schemas/blog.schema';

@Module({
  imports:[
    
    MongooseModule.forFeature([{name:'Comment',schema:CommentSchema}]),
    MongooseModule.forFeature([{name:'Blog',schema:BlogSchema}])
  
  ],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
