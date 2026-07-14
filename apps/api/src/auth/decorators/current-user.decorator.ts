import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { DatabaseUser } from "@kiwiforms/types";

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): DatabaseUser => {
    const request = context.switchToHttp().getRequest<{ user: DatabaseUser }>();
    return request.user;
  },
);
