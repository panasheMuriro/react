import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { StudentService } from 'src/student/student.service';

@Injectable()
export class AuthService {
  constructor(
    private studentService: StudentService,
    private jwtService: JwtService,
  ) {}

  async validateUser(name: string, email: string, password: string) {
    const user = await this.studentService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user; // Exclude password
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      user_email: user.email,
      username: user.name,
      sub: user.id,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(name: string, email: string, password: string) {
    return this.studentService.createStudent(name, email, password);
  }
}
