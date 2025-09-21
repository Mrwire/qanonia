import { Role } from '../constants/roles';

export interface RequestUser {
  id: string;
  email: string;
  orgId: string;
  role: Role;
  locale?: string;
}
