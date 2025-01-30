import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { StudentService } from 'src/student/student.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: StudentService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your_jwt_secret', // Use env variables in production
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findByEmail(payload.email);
    if (!user) {
      throw new Error('Unauthorized');
    }
    return user;
  }
}
