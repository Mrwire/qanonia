import { Role } from '../../common/constants/roles';

export type CaseStatus = 'DRAFT' | 'REVIEW' | 'SIGN' | 'ARCHIVED';

export interface CaseEntity {
  id: string;
  orgId: string;
  clientId: string;
  title: string;
  status: CaseStatus;
  assigneeIds: string[];
  deadline?: string;
  createdAt: string;
  createdBy: string;
  timeline: Array<{
    type: string;
    message: string;
    at: string;
    actorRole: Role;
  }>;
}
