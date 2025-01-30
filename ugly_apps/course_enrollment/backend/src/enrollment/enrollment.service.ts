import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentService } from 'src/student/student.service';
import { Repository } from 'typeorm';
import { Enrollment } from './enrollment.entity';
import { CourseService } from 'src/course/course.service';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentRepository: Repository<Enrollment>,
    private studentService: StudentService,
    private courseService: CourseService,
  ) {}

  async enrollStudent(
    studentId: number,
    courseId: number,
  ): Promise<Enrollment> {
    const student = await this.studentService.getStudentById(studentId);
    const course = await this.courseService.getCourseById(courseId);

    const enrollment = this.enrollmentRepository.create({ student, course });
    return this.enrollmentRepository.save(enrollment);
  }

  async getEnrollments(): Promise<Enrollment[]> {
    return this.enrollmentRepository.find({ relations: ['student', 'course'] });
  }
}
