import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getReadiness() {
    return {
      status: 'ok',
      checks: {
        database: 'pending',
        redis: 'pending',
      },
    };
  }
}
