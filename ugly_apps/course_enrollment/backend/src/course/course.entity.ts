import { Enrollment } from 'src/enrollment/enrollment.entity';
import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
  enrollments: Enrollment[];
}
