import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    const user = await this.userService.createUser(body.email, body.password);
    if (user && user['message'] !== 'User already exists') {
      const payload = { email: user.email, sub: user.id };
      const accessToken = await this.authService.login(payload);
      return { user, accessToken };
    }
    return user; // user already exists case
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const payload = { email: user.email, sub: user.id };
    const accessToken = await this.authService.login(payload);
    return { accessToken };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Request() req) {
    // You can add any server-side logic here if needed, like logging or tracking user logout time.
    // But for JWT, logout is handled on the client-side by deleting the token.
    return { message: `User ${req.user.email} logged out.` };
  }
}
