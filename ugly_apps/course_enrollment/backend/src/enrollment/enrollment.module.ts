import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrollment } from './enrollment.entity';
import { StudentModule } from 'src/student/student.module';
import { CourseModule } from 'src/course/course.module';
import { EnrollmentController } from './enrollment.controller';
import { EnrollmentService } from './enrollment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Enrollment]),
    StudentModule,
    CourseModule,
  ],
  controllers: [EnrollmentController],
  providers: [EnrollmentService],
})
export class EnrollmentModule {}
