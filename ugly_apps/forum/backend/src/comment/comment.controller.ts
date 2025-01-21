import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('create/:postId')
  async createComment(
    @Param('postId') postId: number,
    @Body() body: { content: string; userId: number },
  ) {
    return this.commentService.createComment(postId, body.content, body.userId);
  }

  @Get('post/:postId')
  async getComments(@Param('postId') postId: number) {
    return this.commentService.getComments(postId);
  }
}
