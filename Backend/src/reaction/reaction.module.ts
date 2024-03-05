import { Module } from '@nestjs/common';
import { ReactionController } from './reaction.controller';
import { ReactionService } from './reaction.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ReactionSchema } from './schemas/reaction.schema';
import { BlogSchema } from '../blogs/schemas/blog.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name:'Reaction',schema:ReactionSchema}]),
    MongooseModule.forFeature([{name:'Blog',schema:BlogSchema}])],
  controllers: [ReactionController],
  providers: [ReactionService]
})
export class ReactionModule {}
