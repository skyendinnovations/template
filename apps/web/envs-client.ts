import { z } from "zod";

export const EnvSchemaClient = z.object({
  NEXT_PUBLIC_APP_URL: z.string().optional(),
  NEXT_PUBLIC_BETTER_AUTH_URL: z.string().url().optional(),
});

export type EnvTypeClient = z.infer<typeof EnvSchemaClient>;

// In client-side code, access environment variables with defaults
const NEXT_PUBLIC_APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const NEXT_PUBLIC_BETTER_AUTH_URL =
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000";

export { NEXT_PUBLIC_APP_URL, NEXT_PUBLIC_BETTER_AUTH_URL };
