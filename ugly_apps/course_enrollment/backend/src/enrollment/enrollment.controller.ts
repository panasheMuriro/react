import { Body, Controller, Get, Post } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';

@Controller('enrollments')
export class EnrollmentController {
  constructor(private enrollmentService: EnrollmentService) {}

  @Post()
  async enrollStudent(@Body() body: { studentId: number; courseId: number }) {
    return this.enrollmentService.enrollStudent(body.studentId, body.courseId);
  }

  @Get()
  async getEnrollments() {
    return this.enrollmentService.getEnrollments();
  }
}
