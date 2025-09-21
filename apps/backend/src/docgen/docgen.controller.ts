import { Body, Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Role } from '../common/constants/roles';
import { RequestUser } from '../common/interfaces/request-user.interface';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { DocgenService } from './docgen.service';
import { RenderDocumentDto, renderDocumentSchema } from './dto/render-document.dto';

@Controller('v1/docgen')
export class DocgenController {
  constructor(private readonly docgenService: DocgenService) {}

  @Post('render')
  @Roles(Role.ADMIN, Role.MANAGER)
  @HttpCode(HttpStatus.OK)
  render(
    @Body(new ZodValidationPipe(renderDocumentSchema)) dto: RenderDocumentDto,
    @CurrentUser() user: RequestUser,
    @Req() request: Request,
  ) {
    const userAgentHeader = request.headers['user-agent'];
    const userAgent = Array.isArray(userAgentHeader) ? userAgentHeader[0] : userAgentHeader;

    const result = this.docgenService.render(dto, user, request.ip, userAgent ?? undefined);
    return { data: result };
  }
}
