import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { AuditService } from '../audit/audit.service';
import { RequestUser } from '../common/interfaces/request-user.interface';
import { CreateCaseDto } from './dto/create-case.dto';
import { CaseEntity } from './types/case.entity';

@Injectable()
export class CasesService {
  private readonly cases = new Map<string, CaseEntity>();

  constructor(private readonly auditService: AuditService) {}

  create(input: CreateCaseDto, user: RequestUser, ip?: string, userAgent?: string) {
    const id = randomUUID();
    const createdAt = new Date().toISOString();
    const entity: CaseEntity = {
      id,
      orgId: user.orgId,
      clientId: input.clientId,
      title: input.title,
      status: 'DRAFT',
      assigneeIds: input.assignees ?? [],
      deadline: input.deadline,
      createdAt,
      createdBy: user.id,
      timeline: [
        {
          type: 'CASE_CREATED',
          message: `${user.email} created the case`,
          at: createdAt,
          actorRole: user.role,
        },
      ],
    };
    this.cases.set(id, entity);

    this.auditService.record({
      actorId: user.id,
      orgId: user.orgId,
      entityType: 'Case',
      entityId: id,
      action: 'CASE_CREATED',
      before: null,
      after: entity,
      ip,
      userAgent,
    });

    return entity;
  }

  findById(id: string, orgId: string) {
    const entity = this.cases.get(id);
    if (!entity || entity.orgId !== orgId) {
      throw new NotFoundException({
        code: 'CASE_NOT_FOUND',
        message: 'Case not found',
      });
    }
    return entity;
  }

  list(orgId: string) {
    return Array.from(this.cases.values()).filter((item) => item.orgId === orgId);
  }
}
