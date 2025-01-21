import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Make sure UserRepository is part of the module
  providers: [UserService],
  exports: [TypeOrmModule], // Export TypeOrmModule to make the UserRepository available to other modules
})
export class UserModule {}
