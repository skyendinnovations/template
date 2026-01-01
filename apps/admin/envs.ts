import { z } from "zod";

export const EnvSchema = z.object({
  DATABASE_URL: z.string(),
  NEXT_PUBLIC_APP_URL: z.string(),

  // Just to make sure they exists
  BETTER_AUTH_URL: z.string().url(),
  BETTER_AUTH_SECRET: z.string(),
});

export type EnvType = z.infer<typeof EnvSchema>;

const env = EnvSchema.parse(process.env);

const { DATABASE_URL, NEXT_PUBLIC_APP_URL } = env;

export { DATABASE_URL, NEXT_PUBLIC_APP_URL };
