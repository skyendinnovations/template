import { BETTER_AUTH_URL } from "@/envs-client";
import { getAuthClient } from "@template/auth/client";

export const authClient = getAuthClient({
  name: "@template/web",
  origin: BETTER_AUTH_URL!,
});

export const { signIn, signUp, signOut, useSession } = authClient;
