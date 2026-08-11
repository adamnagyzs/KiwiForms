import { Controller, Get } from "@nestjs/common";
import { SkipThrottle } from "@nestjs/throttler";
import type { HealthCheckResponse } from "@kiwiforms/types";
import { Public } from "./auth/decorators/public.decorator";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @SkipThrottle()
  @Get("health")
  getHealth(): HealthCheckResponse {
    return this.appService.getHealth();
  }
}
