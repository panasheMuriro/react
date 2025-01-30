import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async createStudent(
    name: string,
    email: string,
    password: string,
  ): Promise<Student> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const student = this.studentRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    return this.studentRepository.save(student);
  }

  async getAllStudents(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async findByEmail(email: string): Promise<Student | undefined> {
    return this.studentRepository.findOne({ where: { email } });
  }

  async getStudentById(id: number): Promise<Student | undefined> {
    return this.studentRepository.findOne({
      where: { id },
      relations: ['enrollments', 'enrollments.course'],
    });
  }
}
