// src/users/user.entity.ts
export class User {
  id: number;
  username: string;
  email: string;
  password: string; // hashed
  role: 'user' | 'admin';
  isVerified: boolean;
  refreshToken?: string | null;
}
