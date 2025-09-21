import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  DATABASE_URL: z.string().url().optional(),
  JWT_SECRET: z.string().min(16).optional(),
  REDIS_URL: z.string().url().optional(),
});

export type EnvVars = z.infer<typeof envSchema>;
