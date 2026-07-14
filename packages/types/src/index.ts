export interface JwtPayload {
  sub: string;
  email: string;
  user_metadata?: {
    name?: string;
  };
}

export interface HealthCheckResponse {
  status: "ok" | "error";
  timestamp: string;
}

export * from "./database/database.types";
export * from "./auth/auth.dto";
