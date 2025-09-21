import { Module } from '@nestjs/common';
import { AuditModule } from '../audit/audit.module';
import { CasesService } from './cases.service';
import { CasesController } from './cases.controller';

@Module({
  imports: [AuditModule],
  providers: [CasesService],
  controllers: [CasesController],
  exports: [CasesService],
})
export class CasesModule {}
