import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { AuditLogEntry } from './audit-log.interface';

@Injectable()
export class AuditService {
  private readonly logs: AuditLogEntry[] = [];

  record(entry: Omit<AuditLogEntry, 'id' | 'timestamp'>) {
    const log: AuditLogEntry = {
      ...entry,
      id: randomUUID(),
      timestamp: new Date().toISOString(),
    };
    this.logs.push(log);
    return log;
  }

  all(orgId?: string) {
    if (!orgId) {
      return [...this.logs];
    }
    return this.logs.filter((log) => log.orgId === orgId);
  }
}
