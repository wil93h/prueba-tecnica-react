import { z } from 'zod';

const envSchema = z.object({
  PORT: z.string().default('3000'),
  MONGODB_URI: z.string().url(),
  UPLOADS_DIR: z.string().default('uploads')
});

export const env = envSchema.parse(process.env);