import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from './post.service';
import { Post } from './post.entity';
import { CommentModule } from '../comment/comment.module';
import { PostController } from './post.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    forwardRef(() => CommentModule),
    UserModule,
  ],
  providers: [PostService],
  exports: [PostService], // Ensure PostService is exported
  controllers: [PostController],
})
export class PostModule {}
