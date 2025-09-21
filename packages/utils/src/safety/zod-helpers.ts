import { z } from 'zod';

export const isoDateTimeSchema = z
  .string()
  .refine((value) => !Number.isNaN(Date.parse(value)), {
    message: 'Invalid ISO date-time string',
  });

export type IsoDateTime = z.infer<typeof isoDateTimeSchema>;
