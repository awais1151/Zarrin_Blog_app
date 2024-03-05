import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './schemas/comment.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateCommentDto } from './dto/update-comment';
import { CreateCommentDto } from './dto/create-comment';

@Controller('comment')
export class CommentController {

    constructor(
        private commentService:CommentService
    ){}

    @Get()
    async getAllComments():Promise<Comment[]>{
        return await this.commentService.findAll()
    }

    @Post(':id')
    @UseGuards(JwtAuthGuard)
    async createComment(
        @Body()
        comment:CreateCommentDto,
        @Req()
        req,
        @Param('id')
        id:string
    ):Promise<Comment>{
        return await this.commentService.create(id, comment,req.user)
    }

    @Put(':id')
@UseGuards(JwtAuthGuard)
async UpdateComment(
    @Param('id') 
    id:string,
    @Body()
    comment:UpdateCommentDto,
    @Req()
    req
): Promise<Comment> {
    console.log(Comment.name)
    return this.commentService.updateById(id,comment,req.user)
}


@Delete(':id')
@UseGuards(JwtAuthGuard)
async delComment(
    @Param('id') 
    id:string,
    @Req()
    req
    ): Promise<{ msg: string, deletedComment: Comment }> {
    return await this.commentService.deleteComment(id,req.user);
}

}
