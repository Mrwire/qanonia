import { z } from 'zod';

export const renderDocumentSchema = z.object({
  templateId: z.string().min(1, 'templateId is required'),
  variables: z.record(z.unknown()),
  out: z.enum(['pdf', 'docx']),
  locale: z.enum(['fr', 'ar']),
});

export type RenderDocumentDto = z.infer<typeof renderDocumentSchema>;
