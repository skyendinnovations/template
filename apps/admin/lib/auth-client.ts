import { NEXT_PUBLIC_APP_URL } from "@/envs-client";
import { getAuthClient } from "@template/auth/client";

export const authClient = getAuthClient({
  name: "@template/admin",
  origin: NEXT_PUBLIC_APP_URL!,
});

export const { signIn, signUp, signOut, useSession } = authClient;
