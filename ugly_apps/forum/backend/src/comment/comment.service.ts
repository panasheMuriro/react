import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { PostService } from '../post/post.service'; // Import PostService

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    private postService: PostService, // Inject PostService to fetch post
  ) {}

  // Create a comment associated with a post and user
  async createComment(
    postId: number,
    content: string,
    userId: number,
  ): Promise<Comment> {
    const post = await this.postService.getPostById(postId);
    if (!post) {
      throw new Error('Post not found');
    }

    const comment = this.commentRepository.create({ content, post, userId });
    post.commentCount += 1;
    await this.postService.updatePost(post);

    return this.commentRepository.save(comment);
  }

  // Get all comments for a specific post
  async getComments(postId: number): Promise<Comment[]> {
    return this.commentRepository.find({ where: { post: { id: postId } } });
  }
}
