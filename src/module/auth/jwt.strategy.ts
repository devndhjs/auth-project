// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        // const auth = req.headers['authorization'];
        // console.log('🔑 Raw Authorization header:', auth);
        const auth = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        return auth;
      },
      secretOrKey: 'SECRET_KEY', // TODO: move to config
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
