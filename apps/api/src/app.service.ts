import { Injectable } from '@nestjs/common';
import type { HealthCheckResponse } from '@kiwiforms/types';

@Injectable()
export class AppService {
  getHealth(): HealthCheckResponse {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
