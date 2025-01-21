import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Comment } from './comment.entity';
import { PostModule } from '../post/post.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    forwardRef(() => PostModule),
    UserModule,
  ], // Use forwardRef for circular dependency
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
