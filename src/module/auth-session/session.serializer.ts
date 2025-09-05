/* eslint-disable @typescript-eslint/no-unsafe-function-type */
// src/auth/session.serializer.ts
import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: any, done: Function) {
    done(null, user); // lần này mình lưu nguyên object user vào session
  }

  deserializeUser(payload: any, done: Function) {
    // payload chính là object user đã serialize
    done(null, payload);
  }
}
