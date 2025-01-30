import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CourseService } from './course.service';
import { Course } from './course.entity';

@Controller('courses')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Post()
  async createCourse(@Body() body: { name: string; description: string }) {
    return this.courseService.createCourse(body.name, body.description);
  }

  @Get()
  async getAllCourses() {
    return this.courseService.getAllCourses();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Course> {
    return this.courseService.getCourseById(id);
  }
}
