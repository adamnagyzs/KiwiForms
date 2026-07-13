import { Controller, Get } from '@nestjs/common';
import type { HealthCheckResponse } from '@kiwiforms/types';
import { Public } from './auth/decorators/public.decorator';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('health')
  getHealth(): HealthCheckResponse {
    return this.appService.getHealth();
  }
}
