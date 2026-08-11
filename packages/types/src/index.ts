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

export * from "./database";
export * from "./auth";
export * from "./error";
export * from "./forms";
export * from "./form-submissions";
