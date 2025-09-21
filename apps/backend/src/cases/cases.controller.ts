import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Role } from '../common/constants/roles';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { RequestUser } from '../common/interfaces/request-user.interface';
import { CasesService } from './cases.service';
import { CreateCaseDto, createCaseSchema } from './dto/create-case.dto';

@Controller('v1/cases')
export class CasesController {
  constructor(private readonly casesService: CasesService) {}

  @Post()
  @Roles(Role.ADMIN, Role.MANAGER)
  create(
    @Body(new ZodValidationPipe(createCaseSchema)) dto: CreateCaseDto,
    @CurrentUser() user: RequestUser,
    @Req() request: Request,
  ) {
    const userAgentHeader = request.headers['user-agent'];
    const userAgent = Array.isArray(userAgentHeader) ? userAgentHeader[0] : userAgentHeader;
    const entity = this.casesService.create(dto, user, request.ip, userAgent ?? undefined);
    return { data: entity };
  }

  @Get(':id')
  getOne(@Param('id') id: string, @CurrentUser() user: RequestUser) {
    const entity = this.casesService.findById(id, user.orgId);
    return { data: entity };
  }

  @Get()
  list(@CurrentUser() user: RequestUser) {
    return { data: this.casesService.list(user.orgId) };
  }
}
