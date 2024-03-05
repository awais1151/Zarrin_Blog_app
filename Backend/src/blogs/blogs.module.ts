import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema } from './schemas/blog.schema';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { AuthModule } from '../auth/auth.module';
import { ReactionModule } from '../reaction/reaction.module';

@Module({
  imports:[AuthModule,ReactionModule, MongooseModule.forFeature([{name:'Blog',schema:BlogSchema}])],
  controllers:[BlogsController],
  providers:[BlogsService],
})


export class BlogsModule {}
