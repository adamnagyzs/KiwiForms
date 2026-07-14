import type { DatabaseUser } from "@kiwiforms/types";

declare global {
  namespace Express {
    interface User extends DatabaseUser {}
  }
}

export {};
