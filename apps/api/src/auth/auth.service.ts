import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { SupabaseClient } from "@supabase/supabase-js";
import type {
  JwtPayload,
  SignInDto,
  SignInResponse,
  SignUpDto,
  SignUpResponse,
  DatabaseUser,
} from "@kiwiforms/types";
import {
  SUPABASE_ADMIN_CLIENT,
  SUPABASE_AUTH_CLIENT,
} from "../supabase/supabase.constants";

@Injectable()
export class AuthService {
  constructor(
    @Inject(SUPABASE_ADMIN_CLIENT)
    private readonly supabaseAdmin: SupabaseClient,
    @Inject(SUPABASE_AUTH_CLIENT)
    private readonly supabaseAuth: SupabaseClient,
  ) {}

  async signUp({ email, password, name }: SignUpDto): Promise<SignUpResponse> {
    const { data, error } = await this.supabaseAdmin.auth.admin.createUser({
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

    const { data: user, error: databaseUserError } = await this.supabaseAdmin
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

  async getUser(userId: string): Promise<DatabaseUser> {
    const { data: databaseUser, error: databaseUserError } =
      await this.supabaseAdmin
        .from("users")
        .select("*")
        .eq("id", userId)
        .single<DatabaseUser>();

    if (databaseUserError) {
      throw new BadRequestException(
        `Failed to get user: ${databaseUserError.message}`,
      );
    }

    return databaseUser;
  }

  async getUserFromJwtPayload(payload: JwtPayload): Promise<DatabaseUser> {
    if (!payload.sub || !payload.email) {
      throw new UnauthorizedException();
    }

    const { data: user, error: databaseUserError } = await this.supabaseAdmin
      .from("users")
      .select("*")
      .eq("id", payload.sub)
      .single<DatabaseUser>();

    if (!user || databaseUserError) {
      throw new BadRequestException(
        databaseUserError?.message ?? "Unable to get user",
      );
    }

    return user;
  }

  async signOut(): Promise<void> {
    await this.supabaseAuth.auth.signOut();
  }
}
