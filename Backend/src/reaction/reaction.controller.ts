import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { Reaction } from './schemas/reaction.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/schemas/user.schema';
import { CreateReactionDto } from './dto/create-reaction';

@Controller('reaction')
export class ReactionController {
    constructor(private reactionService:ReactionService)
    {}

@Get()
async getAllReactions():Promise<Reaction[]>{
    return await this.reactionService.findAll()
}

@Post(':id') 
@UseGuards(JwtAuthGuard,RolesGuard)
@Roles(Role.ISUSER)
async userBlogReaction(@Param('id') id:string,@Body()
reaction:CreateReactionDto,@Req() req:any):Promise<Reaction>{
    const blog=await this.reactionService.userBlogReaction(id,reaction,req.user)
    return blog
}



 

}
