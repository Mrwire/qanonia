export interface AuditLogEntry {
  id: string;
  actorId: string;
  orgId: string;
  entityType: string;
  entityId: string;
  action: string;
  before?: unknown;
  after?: unknown;
  ip?: string;
  userAgent?: string;
  timestamp: string;
}
