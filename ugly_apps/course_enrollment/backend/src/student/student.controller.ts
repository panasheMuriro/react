import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './student.entity';

@Controller('students')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Post()
  async createStudent(
    @Body() body: { name: string; email: string; password: string },
  ) {
    return this.studentService.createStudent(
      body.name,
      body.email,
      body.password,
    );
  }

  @Get()
  async getAllStudents() {
    return this.studentService.getAllStudents();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Student> {
    return this.studentService.getStudentById(id);
  }

  // async getStudentById(id: number) {
  //   return this.studentService.getStudentById(id);
  // }
}
