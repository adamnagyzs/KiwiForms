import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { SupabaseClient } from "@supabase/supabase-js";
import type {
  AuthUser,
  JwtPayload,
  SignInDto,
  SignInResponse,
  SignUpDto,
  SignUpResponse,
  DatabaseUser,
} from "@kiwiforms/types";
import { SUPABASE_CLIENT } from "../supabase/supabase.constants";

@Injectable()
export class AuthService {
  constructor(
    @Inject(SUPABASE_CLIENT) private readonly supabase: SupabaseClient,
  ) {}

  async signUp({ email, password, name }: SignUpDto): Promise<SignUpResponse> {
    const { data, error } = await this.supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email for now
    });

    if (error) {
      throw new BadRequestException(error.message);
    }

    if (!data.user) {
      throw new BadRequestException("Unable to create account");
    }

    const { data: user, error: databaseUserError } = await this.supabase
      .from("users")
      .insert<DatabaseUser>({
        email,
        name,
        created_at: new Date().toISOString(),
        id: data.user.id,
      })
      .select()
      .single<DatabaseUser>();

    if (!user || databaseUserError) {
      throw new BadRequestException(
        databaseUserError?.message ?? "Unable to create account",
      );
    }

    return {
      authUser: data.user,
      databaseUser: user,
    };
  }

  async signIn({ email, password }: SignInDto): Promise<SignInResponse> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session || !data.user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return {
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
      user: this.toAuthUser(data.user),
    };
  }

  validateUser(payload: JwtPayload): AuthUser {
    if (!payload.sub || !payload.email) {
      throw new UnauthorizedException();
    }

    return {
      id: payload.sub,
      email: payload.email,
      name: payload.user_metadata?.name ?? "",
    };
  }

  private toAuthUser(user: SupabaseUser): AuthUser {
    return {
      id: user.id,
      email: user.email ?? "",
      name: (user.user_metadata?.name as string | undefined) ?? "",
    };
  }
}
