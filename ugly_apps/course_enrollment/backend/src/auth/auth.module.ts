import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
// import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
// import { StudentService } from 'src/student/student.service';
import { StudentModule } from 'src/student/student.module';
// import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'your_jwt_secret', // Use env variables in production
      signOptions: { expiresIn: '1h' },
    }),
    StudentModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
