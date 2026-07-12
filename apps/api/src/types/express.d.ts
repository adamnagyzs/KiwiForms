import type { AuthUser } from '@kiwiforms/types';

declare global {
  namespace Express {
    interface User extends AuthUser {}
  }
}

export {};
