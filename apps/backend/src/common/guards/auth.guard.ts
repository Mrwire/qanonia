import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RequestUser } from '../interfaces/request-user.interface';
import { Role } from '../constants/roles';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const headers = request.headers;
    const id = headers['x-user-id'];
    const email = headers['x-user-email'];
    const orgId = headers['x-org-id'];
    const roleHeader = headers['x-user-role'];

    if (!id || !email || !orgId || !roleHeader) {
      throw new UnauthorizedException({
        code: 'AUTH_HEADER_MISSING',
        message: 'Authentication headers are required',
      });
    }

    const role = this.parseRole(roleHeader);
    const user: RequestUser = {
      id: Array.isArray(id) ? id[0] : String(id),
      email: Array.isArray(email) ? email[0] : String(email),
      orgId: Array.isArray(orgId) ? orgId[0] : String(orgId),
      role,
    };

    request.user = user;
    return true;
  }

  private parseRole(raw: string | string[]): Role {
    const value = Array.isArray(raw) ? raw[0] : raw;
    if (!Object.values(Role).includes(value as Role)) {
      throw new UnauthorizedException({
        code: 'AUTH_INVALID_ROLE',
        message: 'Role provided is not supported',
      });
    }
    return value as Role;
  }
}
