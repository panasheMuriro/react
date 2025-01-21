import { Controller, Post, Body, Get } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  // Create a post with userId
  @Post('create')
  async createPost(
    @Body() body: { title: string; content: string; userId: number }, // Include userId
  ) {
    return this.postService.createPost(body.title, body.content, body.userId);
  }

  // Get all posts with their comments and associated user
  @Get()
  async getAllPosts() {
    return this.postService.getPosts();
  }
}
