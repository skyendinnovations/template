import { headers } from "next/headers";
import { getAuth } from "@template/auth";
import getDb from "@/lib/db";
import {
  adminUser,
  adminSession,
  adminAccount,
  adminVerification,
} from "@template/data/schema";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

const adminSchema = {
  user: adminUser,
  session: adminSession,
  account: adminAccount,
  verification: adminVerification,
};

// Create auth instance with app-specific configuration
const authInstance = getAuth(
  {
    name: "@template/admin",
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
  drizzleAdapter(getDb(), { provider: "pg", schema: adminSchema })
);

export async function auth() {
  const headersList = await headers();
  return await authInstance.api.getSession({
    headers: headersList,
  });
}
