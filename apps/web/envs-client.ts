import { z } from "zod";

export const EnvSchemaClient = z.object({
  NEXT_PUBLIC_APP_URL: z.string().optional(),
  BETTER_AUTH_URL: z.string().url(),
  BETTER_AUTH_SECRET: z.string(),
});

export type EnvTypeClient = z.infer<typeof EnvSchemaClient>;

// In client-side code, access environment variables with defaults
const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL;
const BETTER_AUTH_URL = process.env.BETTER_AUTH_URL;
const BETTER_AUTH_SECRET = process.env.BETTER_AUTH_SECRET;

export { NEXT_PUBLIC_APP_URL, BETTER_AUTH_URL, BETTER_AUTH_SECRET };
