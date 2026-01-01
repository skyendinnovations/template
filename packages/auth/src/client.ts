import { createAuthClient } from "better-auth/react";

export const createClientAuth = (baseURL: string) => {
  return createAuthClient({
    baseURL,
  });
};

