import type { AuthConfig } from "./types";

export const getCookiePrefix = (app: AuthConfig["name"]) => {
  if (process.env.NODE_ENV === "production") {
    return "auth";
  }

  switch (app) {
    case "@template/admin":
      return "admin__auth";
    case "@template/web":
      return "web__auth";
    default:
      throw new Error(`Invalid app: ${app}.`);
  }
};
