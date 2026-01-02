import { headers } from "next/headers";

// This will be set when the auth instance is created
let authInstance: any = null;

export function setAuthInstance(auth: any) {
  authInstance = auth;
}

export async function auth() {
  if (!authInstance) {
    throw new Error("Auth instance not set. Call setAuthInstance first.");
  }

  const headersList = await headers();
  return await authInstance.api.getSession({
    headers: headersList,
  });
}
