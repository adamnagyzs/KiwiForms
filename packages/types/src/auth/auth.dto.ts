import type { User } from "@supabase/supabase-js";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from "class-validator";
import type { Database } from "../database/database.types";
import type { Session } from "@supabase/supabase-js";
export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/, {
    message:
      "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;
}

export type DatabaseUser = Database["public"]["Tables"]["users"]["Row"];

export class SignUpResponse {
  authUser: User;
  databaseUser: DatabaseUser;
}

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SignInResponse {
  authUser: User;
  databaseUser: DatabaseUser;
}
