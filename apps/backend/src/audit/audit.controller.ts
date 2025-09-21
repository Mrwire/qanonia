import { Controller, Get, Query } from '@nestjs/common';
import { AuditService } from './audit.service';

@Controller('v1/audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get()
  list(@Query('orgId') orgId?: string) {
    return { data: this.auditService.all(orgId) };
  }
}
