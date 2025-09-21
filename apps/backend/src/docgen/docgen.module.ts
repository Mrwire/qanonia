import { Module } from '@nestjs/common';
import { AuditModule } from '../audit/audit.module';
import { DocgenController } from './docgen.controller';
import { DocgenService } from './docgen.service';

@Module({
  imports: [AuditModule],
  controllers: [DocgenController],
  providers: [DocgenService],
})
export class DocgenModule {}
