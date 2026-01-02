import { headers } from "next/headers";
import { getAuth } from "@template/auth";
import { getDb } from "@/lib/db";
import { user, session, account, verification } from "@template/data/schema";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

const webSchema = {
  user: user,
  session: session,
  account: account,
  verification: verification,
};

// Create auth instance with app-specific configuration
const authInstance = getAuth(
  {
    name: "@template/web",
    sendVerificationEmail: async ({ user, url }) => {
      // TODO: Implement email sending
      console.log("Send verification email to:", user.email, "URL:", url);
    },
    sendMagicLink: async ({ email, url }) => {
      // TODO: Implement email sending
      console.log("Send magic link to:", email, "URL:", url);
    },
    sendResetPassword: async ({ user, url }) => {
      // TODO: Implement email sending
      console.log("Send reset password to:", user.email, "URL:", url);
    },
  },
  drizzleAdapter(getDb(), { provider: "pg", schema: webSchema })
);

export async function auth() {
  const headersList = await headers();
  return await authInstance.api.getSession({
    headers: headersList,
  });
}
