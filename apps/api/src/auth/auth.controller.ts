import { Body, Controller, Get, Post } from '@nestjs/common';
import type { ApiResponse, AuthUser, LoginDto, LoginResponse } from '@kiwiforms/types';
import { CurrentUser } from './decorators/current-user.decorator';
import { Public } from './decorators/public.decorator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() body: LoginDto): ApiResponse<LoginResponse> {
    return {
      data: this.authService.login(body),
    };
  }

  @Get('me')
  getProfile(@CurrentUser() user: AuthUser): ApiResponse<AuthUser> {
    return {
      data: user,
    };
  }
}
