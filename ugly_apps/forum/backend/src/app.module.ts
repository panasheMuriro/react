import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
// import { CommentModule } from './comment/comment.module';
import { User } from './user/user.entity';
import { Post } from './post/post.entity';
import { Comment } from './comment/comment.entity';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data.db', // SQLite database name
      entities: [User, Post, Comment], // Add your entities here
      synchronize: true, // In development, can set to true, but false in production
    }),
    UserModule,
    AuthModule,
    PostModule,
    CommentModule,
  ],
})
export class AppModule {}
