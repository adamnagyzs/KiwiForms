import { Controller, Get } from '@nestjs/common';
import type { ApiResponse, HealthCheckResponse } from '@kiwiforms/types';
import { Public } from './auth/decorators/public.decorator';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('health')
  getHealth(): ApiResponse<HealthCheckResponse> {
    return {
      data: this.appService.getHealth(),
    };
  }
}
