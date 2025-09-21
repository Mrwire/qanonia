import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { createHash, randomUUID } from 'crypto';
import { z, ZodSchema } from 'zod';
import { AuditService } from '../audit/audit.service';
import { RequestUser } from '../common/interfaces/request-user.interface';
import { RenderDocumentDto } from './dto/render-document.dto';

interface TemplateDefinition {
  id: string;
  name: string;
  locales: Array<'fr' | 'ar'>;
  body: string;
  variablesSchema: ZodSchema;
}

interface RenderedDocumentMetadata {
  id: string;
  templateId: string;
  format: 'pdf' | 'docx';
  locale: 'fr' | 'ar';
  storageKey: string;
  hash: string;
  createdAt: string;
}

const DOWNLOAD_BASE_URL = 'https://cdn.qanounia.local';

@Injectable()
export class DocgenService {
  private readonly templates = new Map<string, TemplateDefinition>();
  private readonly documents = new Map<string, RenderedDocumentMetadata>();

  constructor(private readonly auditService: AuditService) {
    this.seedTemplates();
  }

  render(input: RenderDocumentDto, user: RequestUser, ip?: string, userAgent?: string) {
    const template = this.templates.get(input.templateId);
    if (!template) {
      throw new NotFoundException({
        code: 'TEMPLATE_NOT_FOUND',
        message: 'Template does not exist',
      });
    }

    if (!template.locales.includes(input.locale)) {
      throw new BadRequestException({
        code: 'TEMPLATE_LOCALE_UNSUPPORTED',
        message: 'Requested locale is not supported for this template',
        details: { supported: template.locales, requested: input.locale },
      });
    }

    const parseResult = template.variablesSchema.safeParse(input.variables);
    if (!parseResult.success) {
      throw new BadRequestException({
        code: 'TEMPLATE_VARIABLES_INVALID',
        message: 'Provided variables are invalid for this template',
        details: parseResult.error.flatten(),
      });
    }

    const documentContent = this.renderBody(template.body, parseResult.data);
    const payload = this.wrapContent(documentContent, template, input);
    const hash = createHash('sha256').update(payload).digest('hex');
    const documentId = randomUUID();
    const storageKey = `documents/${documentId}.${input.out}`;
    const createdAt = new Date().toISOString();

    this.documents.set(documentId, {
      id: documentId,
      templateId: template.id,
      format: input.out,
      locale: input.locale,
      storageKey,
      hash,
      createdAt,
    });

    this.auditService.record({
      actorId: user.id,
      orgId: user.orgId,
      entityType: 'Document',
      entityId: documentId,
      action: 'DOCUMENT_RENDERED',
      before: null,
      after: {
        templateId: template.id,
        format: input.out,
        locale: input.locale,
        storageKey,
      },
      ip,
      userAgent,
    });

    return {
      documentId,
      storageKey,
      hash,
      downloadUrl: `${DOWNLOAD_BASE_URL}/${storageKey}`,
    };
  }

  listDocuments() {
    return Array.from(this.documents.values());
  }

  private seedTemplates() {
    this.registerTemplate({
      id: 'contract-basic-fr',
      name: 'Contrat de prestation',
      locales: ['fr', 'ar'],
      body:
        '# Contrat de prestation\n\nClient: {{client.name}}\nOrganisation: {{org.name}}\nObjet: {{engagement.title}}\nMontant: {{engagement.amount}} {{engagement.currency}}\nDate: {{engagement.date}}',
      variablesSchema: z.object({
        client: z.object({
          name: z.string().min(1),
        }),
        org: z.object({
          name: z.string().min(1),
        }),
        engagement: z.object({
          title: z.string().min(3),
          amount: z.number().positive(),
          currency: z.string().length(3),
          date: z.string(),
        }),
      }),
    });
  }

  private registerTemplate(definition: TemplateDefinition) {
    this.templates.set(definition.id, definition);
  }

  private renderBody(body: string, variables: unknown) {
    if (!variables || typeof variables !== 'object') {
      return body;
    }

    return body.replace(/{{\s*([\w.]+)\s*}}/g, (_, path: string) => {
      const value = this.resolvePath(variables as Record<string, unknown>, path.split('.'));
      if (value === undefined || value === null) {
        throw new BadRequestException({
          code: 'TEMPLATE_VARIABLE_MISSING',
          message: `Missing value for variable ${path}`,
        });
      }
      if (typeof value === 'number' || typeof value === 'boolean') {
        return String(value);
      }
      if (typeof value === 'string') {
        return value;
      }
      return JSON.stringify(value);
    });
  }

  private wrapContent(content: string, template: TemplateDefinition, input: RenderDocumentDto) {
    const header = `Template: ${template.name}\nLocale: ${input.locale}\nFormat: ${input.out}\n---\n`;
    return Buffer.from(`${header}${content}`, 'utf-8');
  }

  private resolvePath(source: Record<string, unknown>, segments: string[]): unknown {
    return segments.reduce<unknown>((acc, key) => {
      if (acc && typeof acc === 'object' && key in (acc as Record<string, unknown>)) {
        return (acc as Record<string, unknown>)[key];
      }
      return undefined;
    }, source);
  }
}
