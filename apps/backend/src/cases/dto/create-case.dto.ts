import { z } from 'zod';

export const createCaseSchema = z.object({
  title: z.string().min(3).max(255),
  clientId: z.string().uuid({ message: 'clientId must be a UUID' }),
  assignees: z.array(z.string().uuid()).default([]),
  deadline: z
    .string()
    .datetime({ offset: true })
    .optional(),
});

export type CreateCaseDto = z.infer<typeof createCaseSchema>;
