// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../user/user.service';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private users: UsersService,
    private jwt: JwtService,
  ) {}

  async register(username: string, email: string, password: string) {
    return this.users.create({ username, email, password });
  }

  async login(email: string, password: string) {
    const user = await this.users.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid password');

    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = this.jwt.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwt.sign(payload, { expiresIn: '7d' });

    await this.users.saveRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }

  async refreshToken(userId: number, refreshToken: string) {
    const user = await this.users.findById(userId);
    if (!user || user.refreshToken !== refreshToken)
      throw new UnauthorizedException('Invalid refresh token');

    const payload = { sub: user.id, email: user.email, role: user.role };
    return { accessToken: this.jwt.sign(payload, { expiresIn: '15m' }) };
  }
}
