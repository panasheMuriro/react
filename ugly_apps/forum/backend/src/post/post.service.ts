import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { User } from 'src/user/user.entity'; // Import User entity

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(User) // Inject User repository for user validation
    private userRepository: Repository<User>,
  ) {}

  // Create a post with userId
  async createPost(
    title: string,
    content: string,
    userId: number,
  ): Promise<Post> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    const post = this.postRepository.create({ title, content, userId });
    return await this.postRepository.save(post);
  }

  // Get all posts with their comments and associated user
  async getPosts(): Promise<Post[]> {
    return this.postRepository.find({ relations: ['comments', 'user'] });
  }

  // Get a specific post by ID with its comments and associated user
  async getPostById(id: number): Promise<Post> {
    return this.postRepository.findOne({
      where: { id },
      relations: ['comments', 'user'],
    });
  }

  async updatePost(post: Post): Promise<Post> {
    return this.postRepository.save(post);
  }
}
