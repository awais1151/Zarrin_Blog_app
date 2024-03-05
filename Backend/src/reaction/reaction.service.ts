import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Reaction } from './schemas/reaction.schema';
import mongoose from 'mongoose';
import { Blog } from '../blogs/schemas/blog.schema';
import { CreateReactionDto } from './dto/create-reaction';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class ReactionService {

    constructor(
        @InjectModel(Reaction.name)

        private reactionModel:mongoose.Model<Reaction>,
        @InjectModel(Blog.name)
        private blogModel:mongoose.Model<Blog>
    )
    {}

    async findAll():Promise<Reaction[]>{

        const reactions= await this.reactionModel.find();
        return reactions;

    }


    // User Reaction on Blog
    async userBlogReaction(id: string, reactionData:CreateReactionDto, user: User): Promise<Reaction> {
       const  reactionTypeData:string  = reactionData.reactionType
       
        const reaction = await this.reactionModel.find({ blog: id, user: user._id })
        console.log(reaction);
        if (reaction.length === 0) {
            const newReaction = await this.reactionModel.create({
                reactionType: reactionTypeData,
                blog: id,
                user: user._id,
            })
            console.log(newReaction);
            
            const blog = await this.blogModel.findById(id)
            blog.reaction.push(newReaction._id)
            await blog.save()
            console.log('reaction created successfully');
            return newReaction
        };

        if (reaction[0].reactionType === reactionData.reactionType) {
            const deletedReaction = await this.reactionModel.findByIdAndDelete(reaction[0]._id);
            const blog = await this.blogModel.findById(id)
            blog.reaction = blog.reaction.filter(id => id !== deletedReaction._id.toString());
            await blog.save()
            console.log('reaction deleted successfully');
            return deletedReaction
        }
        const updateReaction = await this.reactionModel.findByIdAndUpdate(reaction[0]._id, { reactionType:reactionData.reactionType })
        console.log('reaction updated successfully');
        return updateReaction;
    }
}
