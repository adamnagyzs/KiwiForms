import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type {
  AuthUser,
  JwtPayload,
  LoginDto,
  LoginResponse,
  User,
} from '@kiwiforms/types';

@Injectable()
export class AuthService {
  private readonly users: User[] = [
    {
      id: '1',
      email: 'demo@kiwiforms.com',
      name: 'Demo User',
      createdAt: '2026-01-01T00:00:00.000Z',
    },
  ];

  constructor(private readonly jwtService: JwtService) {}

  validateUser(payload: JwtPayload): AuthUser {
    const user = this.users.find((entry) => entry.id === payload.sub);

    if (!user || user.email !== payload.email) {
      throw new UnauthorizedException();
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }

  login({ email }: LoginDto): LoginResponse {
    const user = this.users.find((entry) => entry.email === email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }
}
