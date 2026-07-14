import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import type {
  DatabaseUser,
  SignInDto,
  SignInResponse,
  SignUpDto,
  SignUpResponse,
} from "@kiwiforms/types";
import { CurrentUser } from "./decorators/current-user.decorator";
import { Public } from "./decorators/public.decorator";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("signup")
  signUp(@Body() body: SignUpDto): Promise<SignUpResponse> {
    return this.authService.signUp(body);
  }

  @Public()
  @Post("signin")
  signIn(@Body() body: SignInDto): Promise<SignInResponse> {
    return this.authService.signIn(body);
  }

  @Get("me")
  getMe(@CurrentUser() user: DatabaseUser): DatabaseUser {
    return user;
  }

  @Get("user/:id")
  async getUser(@Param("id") userId: string): Promise<DatabaseUser> {
    return this.authService.getUser(userId);
  }
}
