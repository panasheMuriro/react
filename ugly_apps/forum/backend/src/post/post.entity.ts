import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Comment } from '../comment/comment.entity'; // Import Comment entity
import { User } from 'src/user/user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: 0 })
  commentCount: number; // Track number of comments

  //   @ManyToOne(() => User, (user) => user.posts)
  //   user: User;

  // Instead of embedding the full User entity, we store just the userId
  @Column()
  userId: number;

  // Define the relation with User using only the userId
  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'userId' }) // Specify that the relation is on the 'userId' column
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post, { cascade: true })
  comments: Comment[];
}
