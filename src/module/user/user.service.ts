// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private users: User[] = [];

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((u) => u.email === email);
  }

  async findById(id: number): Promise<User | undefined> {
    return this.users.find((u) => u.id === id);
  }

  async create(user: Partial<User>): Promise<User> {
    if (!user.username || !user.email || !user.password) {
      throw new Error('Missing required fields');
    }
    const newUser: User = {
      id: this.users.length + 1,
      username: user.username,
      email: user.email,
      password: await bcrypt.hash(user.password, 10),
      role: user.role || 'user',
      isVerified: false,
      refreshToken: null,
    };
    this.users.push(newUser);
    return newUser;
  }

  async saveRefreshToken(id: number, token: string) {
    const user = await this.findById(id);
    if (user) user.refreshToken = token;
  }
}
