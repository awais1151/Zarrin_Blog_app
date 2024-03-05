import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './schemas/comment.schema';
import mongoose from 'mongoose';
import { Role, User } from '../auth/schemas/user.schema';
import { CreateCommentDto } from './dto/create-comment';
import { UpdateCommentDto } from './dto/update-comment';
import { Blog } from '../blogs/schemas/blog.schema';

@Injectable()
export class CommentService {
    constructor(
        @InjectModel(Comment.name)

        private commentModel: mongoose.Model<Comment>,

        @InjectModel(Blog.name)
        private blogModel: mongoose.Model<Blog>
    ) { }

    async findAll(): Promise<Comment[]> {
        const comments = await this.commentModel.find();
        return comments;
    }


    async create(id: string, comment: CreateCommentDto, user: User): Promise<Comment> {
        const isValidObjectId = mongoose.isValidObjectId(id)
        if (!isValidObjectId) {
            throw new BadRequestException('Object id is not correct ')
        }

        //get the blog check the blog id is valid 

        const blog = await this.blogModel.findById(id);
        if (!blog) {
            throw new BadRequestException('Please enter correct Blog id')
        }

        //merge the data in the single object


        const data = Object.assign(comment, { user: user._id }, { blog: id });
        const res = await this.commentModel.create(data)
        blog.comments.push(res._id)
        blog.save();
        return res;

    }

    // // / Create Comment
    // async createComment(id: string, createCommentDto: createCommentDto, user: User): Promise<Comment> {
    //     const isValidObjectId = mongoose.isValidObjectId(id)
    //     // Check the id is valid mongoose id
    //     if (!isValidObjectId) {
    //         throw new BadRequestException('Object Id is not correct')
    //     }
    //     // Get the Blog and check the Blog Id is valid
    //     const blog = await this.blogModel.findById(id);
    //     if (!blog) {
    //         throw new BadRequestException('Please enter correct Blog id')
    //     }
    //     // Merge the data in single object
    //     const data = Object.assign(createCommentDto, { user: user._id }, { blog: id });
    //     // Create comment
    //     const createComment = await this.commentModel.create(data)
    //     // Pass comment id in blog also
    //     blog.comments.push(createComment._id)
    //     blog.save();
    //     return createComment;
    // }



    async updateById(id: string, comment: UpdateCommentDto, user: User): Promise<Comment> {
        console.log('aaa',id,comment,user)
        const getcomment = await this.commentModel.findById(id)
        if (getcomment?.user?.toString() !== user?._id?.toString()) {
            throw new UnauthorizedException('User Not Authorized')
        }

        return await this.commentModel.findByIdAndUpdate(id, comment, {
            new: true,
            runValidators: true
        });
    }

    // async deleteById(id:string, user: User):Promise<{ msg: string, deletedComment: Comment }>{


    //     const isValidObjectId = mongoose.isValidObjectId(id)
    //     // Check the id is valid mongoose id
    //     if (!isValidObjectId) {
    //         throw new BadRequestException('Object Id is not correct')
    //     }
    //     return await  this.commentModel.findByIdAndDelete(id);
    // }





    // / Delete Comment
    async deleteComment(id: string, user: User): Promise<{ msg: string, deletedComment: Comment }> {
        const isValidObjectId = mongoose.isValidObjectId(id)
        // Check the id is valid mongoose id
        if (!isValidObjectId) {
            throw new BadRequestException('Object Id is not correct')
        }
        // Delete Function Admin Role By Bypassing the comment creator logc
        if (user.role === Role.ISADMIN) {
            const deletedComment = await this.commentModel.findByIdAndDelete(id);
            // Delete the comment in blog also by admin
            const blog = await this.blogModel.findById(deletedComment.blog)
            blog.comments = blog.comments.filter(id => id !== deletedComment._id.toString());
            await blog.save()
            return { msg: "Comment Deleted Successfully by admin", deletedComment };
        }
        // Check user is same which create comment
        const comment = await this.commentModel.findById(id)
        if (comment.user._id.toString() !== user._id.toString()) {
            throw new UnauthorizedException('Please authorized yourself :)')
        }
        // Deleted the comment in blog also by authorized user
        const deletedComment = await this.commentModel.findByIdAndDelete(id)
        // Get the deleted Blog
        const blog = await this.blogModel.findById({ _id: deletedComment.blog.toString() })
        // Update Comments in Blog by filtering the deleted Blog
        blog.comments = blog.comments.filter(commentId => commentId.toString() !== deletedComment._id.toString());
        await blog.save()
        return { msg: 'Comment deleted successfully by user', deletedComment };
    }











}
