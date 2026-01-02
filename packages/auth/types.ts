import type { betterAuth } from 'better-auth';
import type { magicLink } from 'better-auth/plugins';

export type AuthConfigAdmin = {
  name: '@template/admin';
  sendVerificationEmail?: NonNullable<
    Parameters<typeof betterAuth>[0]['emailVerification']
  >['sendVerificationEmail'];
  sendMagicLink: Parameters<typeof magicLink>[0]['sendMagicLink'];
  sendResetPassword: NonNullable<
    NonNullable<Parameters<typeof betterAuth>[0]['emailAndPassword']>
  >['sendResetPassword'];
  onPasswordReset?: NonNullable<
    NonNullable<Parameters<typeof betterAuth>[0]['emailAndPassword']>
  >['onPasswordReset'];
  beforeUserCreateHook?: NonNullable<
    NonNullable<
      NonNullable<Parameters<typeof betterAuth>[0]['databaseHooks']>['user']
    >['create']
  >['before'];
};

export type AuthConfigWeb = {
  name: '@template/web';
  sendVerificationEmail?: NonNullable<
    Parameters<typeof betterAuth>[0]['emailVerification']
  >['sendVerificationEmail'];
  sendMagicLink: Parameters<typeof magicLink>[0]['sendMagicLink'];
  sendResetPassword: NonNullable<
    NonNullable<Parameters<typeof betterAuth>[0]['emailAndPassword']>
  >['sendResetPassword'];
  onPasswordReset?: NonNullable<
    NonNullable<Parameters<typeof betterAuth>[0]['emailAndPassword']>
  >['onPasswordReset'];
  beforeUserCreateHook?: NonNullable<
    NonNullable<
      NonNullable<Parameters<typeof betterAuth>[0]['databaseHooks']>['user']
    >['create']
  >['before'];
};

export type AuthConfig =
  | AuthConfigAdmin
  | AuthConfigWeb;
