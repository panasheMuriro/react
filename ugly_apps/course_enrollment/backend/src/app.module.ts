// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { StudentService } from './student/student.service';
// import { CourseService } from './course/course.service';
// import { EnrollmentService } from './enrollment/enrollment.service';
// import { EnrollmentModule } from './enrollment/enrollment.module';
// import { CourseModule } from './course/course.module';
// import { StudentModule } from './student/student.module';
// import { StudentController } from './student/student.controller';
// import { CourseController } from './course/course.controller';

// @Module({
//   imports: [EnrollmentModule, CourseModule, StudentModule],
//   controllers: [AppController, StudentController, CourseController],
//   providers: [AppService, StudentService, CourseService, EnrollmentService],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from './student/student.module';
import { CourseModule } from './course/course.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { Student } from './student/student.entity';
import { Course } from './course/course.entity';
import { Enrollment } from './enrollment/enrollment.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // Database connection with SQLite
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite', // SQLite database file
      entities: [Student, Course, Enrollment],
      synchronize: true, // Automatically sync database schema (disable in production!)
      logging: true, // Enables logging queries for debugging
    }),
    StudentModule,
    AuthModule,
    CourseModule,
    EnrollmentModule,
  ],
})
export class AppModule {}
