import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    // first try t find the user
    const user = await this.userService.createUser(body.email, body.password);
    // return user;
    // Check if the user already exists
    if ('message' in user) {
      return user; // Return the "User already exists" message
    }

    // Generate the accessToken
    const accessToken = await this.authService.login(user as any);

    // Return the user and accessToken
    return { user, accessToken };
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return {
      accessToken: this.authService.login(user),
      user: { email: user.email },
    };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Request() req) {
    return { message: `User ${req.user.email} logged out.` };
  }
}
