import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import type { JwtPayload } from '@kiwiforms/types';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('signed-token'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('validateUser returns the authenticated user from the JWT payload', () => {
    const payload: JwtPayload = {
      sub: '1',
      email: 'demo@kiwiforms.com',
    };

    expect(service.validateUser(payload)).toEqual({
      id: '1',
      email: 'demo@kiwiforms.com',
      name: 'Demo User',
    });
  });

  it('validateUser rejects unknown users', () => {
    expect(() =>
      service.validateUser({ sub: '999', email: 'missing@kiwiforms.com' }),
    ).toThrow(UnauthorizedException);
  });

  it('login returns an access token and user', () => {
    expect(
      service.login({ email: 'demo@kiwiforms.com', password: 'secret' }),
    ).toEqual({
      accessToken: 'signed-token',
      user: {
        id: '1',
        email: 'demo@kiwiforms.com',
        name: 'Demo User',
      },
    });
  });
});
