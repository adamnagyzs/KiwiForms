export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export interface JwtPayload {
  sub: string;
  email: string;
  user_metadata?: {
    name?: string;
  };
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface HealthCheckResponse {
  status: "ok" | "error";
  timestamp: string;
}

export interface CreateUserDto {
  email: string;
  name: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface SignInResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}

export * from "./database/database.types";
export * from "./auth/auth.dto";
