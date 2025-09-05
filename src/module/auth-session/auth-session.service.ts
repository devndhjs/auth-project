// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async validateUser(username: string, password: string): Promise<any> {
    if (username === 'demo' && password === '123') {
      return { id: 1, username: 'demo', role: 'user' };
    }
    if (username === 'admin' && password === '123') {
      return { id: 2, username: 'admin', role: 'admin' };
    }
    return null;
  }
}
