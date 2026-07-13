import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { AuthUser, JwtPayload } from '@kiwiforms/types';
import { AuthService } from '../src/auth/auth.service';

export const JWT_TEST_SECRET = 'test-jwt-secret';

@Injectable()
export class JwtTestStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_TEST_SECRET,
    });
  }

  validate(payload: JwtPayload): AuthUser {
    return this.authService.validateUser(payload);
  }
}
