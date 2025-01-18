import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(email: string, password: string): Promise<User | object> {
    const user = await this.findByEmail(email);
    if (user) {
      //   throw new Error('User already exists');
      return { status: 'error', message: 'User already exists' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      email,
      password: hashedPassword,
    });
    return this.userRepository.save(newUser);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }
}
