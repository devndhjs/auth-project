// src/auth/auth.controller.ts
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  register(@Body() body: any) {
    return this.auth.register(body.username, body.email, body.password);
  }

  @Post('login')
  login(@Body() body: any) {
    return this.auth.login(body.email, body.password);
  }

  @Post('refresh')
  refresh(@Body() body: any) {
    return this.auth.refreshToken(body.userId, body.refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  profile(@Req() req) {
    return req.user;
  }
}
