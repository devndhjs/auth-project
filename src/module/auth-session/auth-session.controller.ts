// src/auth/auth.controller.ts
import { Controller, Post, UseGuards, Req, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedGuard } from './authenticated.guard';
import { Role } from './role.decorator';
import { RolesGuard } from './roles.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req) {
    return { message: 'Login success', user: req.user };
  }

  @Post('logout')
  logout(@Req() req) {
    req.logout(() => {});
    return { message: 'Logged out' };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return {
      message: 'This is your profile',
      user: req.user,
    };
  }

  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Role('admin')
  @Get('admin')
  getAdminData(@Req() req) {
    return { message: 'Admin zone', user: req.user };
  }
}
