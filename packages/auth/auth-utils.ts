import { ADMIN_DOMAINS } from './const';

export const isAdminDomain = (email: string) => {
  return ADMIN_DOMAINS.some((domain) => email.endsWith(domain));
};

export const isAdminEmail = (email: string) => {
  return isAdminDomain(email);
};
