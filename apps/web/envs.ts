import { z } from "zod";

export const EnvSchema = z.object({
  BETTER_AUTH_URL: z.string().url(),
  BETTER_AUTH_SECRET: z.string(),
  DATABASE_URL: z.string(),
  NEXT_PUBLIC_APP_URL: z.string(),
});

export type EnvType = z.infer<typeof EnvSchema>;
 
const env = EnvSchema.parse(process.env);

const {
    BETTER_AUTH_URL,
    BETTER_AUTH_SECRET,
    DATABASE_URL,
    NEXT_PUBLIC_APP_URL,
} = env;

export {
    BETTER_AUTH_URL,
    BETTER_AUTH_SECRET,
    DATABASE_URL,
    NEXT_PUBLIC_APP_URL,
}