import { createAuthClient } from "better-auth/react";
import {
  type AuthAdmin,
  type AuthWeb,
} from "./auth";
import {
  adminClient,
  inferAdditionalFields,
  magicLinkClient,
} from "better-auth/client/plugins";

type AuthClientConfigAdmin = {
  name: "@template/admin";
  origin: string;
};

type AuthClientConfigWeb = {
  name: "@template/web";
  origin: string;
};

export type AuthClientConfig = AuthClientConfigAdmin | AuthClientConfigWeb;

const getAuthClientAdmin = (config: AuthClientConfigAdmin) => {
  return createAuthClient({
    baseURL: config.origin,
    plugins: [
      inferAdditionalFields<AuthAdmin>(),
      magicLinkClient(),
      adminClient(),
    ],
  });
};

const getAuthClientWeb = (config: AuthClientConfigWeb) => {
  return createAuthClient({
    baseURL: config.origin,
    plugins: [
      inferAdditionalFields<AuthWeb>(),
      magicLinkClient(),
      adminClient(),
    ],
  });
};

type AuthClientByName<N> = N extends "@template/admin"
  ? AuthClientAdmin
  : N extends "@template/web"
    ? AuthClientWeb
    : never;

export type AuthClientAdmin = ReturnType<typeof getAuthClientAdmin>;
export type AuthClientWeb = ReturnType<typeof getAuthClientWeb>;

export const getAuthClient = <N extends AuthClientConfig["name"]>(
  config: Extract<AuthClientConfig, { name: N }>
) => {
  const { name } = config;

  switch (name) {
    case "@template/admin": {
      return getAuthClientAdmin(
        config as AuthClientConfigAdmin
      ) as AuthClientByName<N>;
    }

    case "@template/web": {
      return getAuthClientWeb(
        config as AuthClientConfigWeb
      ) as AuthClientByName<N>;
    }

    default:
      const exhaustiveCheck: never = name;
      throw new Error(`Invalid application type: ${exhaustiveCheck}.`);
  }
};
