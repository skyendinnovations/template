# @template/auth

A reusable authentication package for Better Auth setup that can be used across multiple applications.

## What's Included

- **Flexible server-side auth**: `createAuth(db, schema)` function for Better Auth configuration
- **Client-side auth factory**: `createClientAuth()` for React client setup
- **Schemas and types**: Zod schemas for sign-in/sign-up forms and TypeScript types

## Multi-App Usage

This package is designed to be used across multiple applications. Each app can:

1. **Use its own database** by passing custom `db` and `schema` parameters
2. **Implement custom server actions** with app-specific logic
3. **Configure its own auth client** with different base URLs
4. **Maintain its own authentication flows** while sharing common schemas

## Setup for New Apps

### 1. Install Dependencies

```json
{
  "dependencies": {
    "@template/auth": "workspace:*",
    "@template/data": "workspace:*",
    "better-auth": "^1.0.0",
    "zod": "^3.0.0",
    "next-safe-action": "^0.0.0"
  }
}
```

### 2. Server Setup (App-specific)

```typescript
// app/api/auth/[...all]/route.ts
import { createAuth } from "@template/auth";
import { getDb } from "@/lib/db"; // Your app's database function
import * as schema from "@/lib/schema"; // Your app's schema
import { toNextJsHandler } from "better-auth/next-js";

export const runtime = "nodejs";

// Create auth instance with your app's database and schema
const auth = createAuth(getDb(), schema);

export const GET = async (request: Request) => {
  const handler = toNextJsHandler(auth);
  return handler.GET(request);
};

export const POST = async (request: Request) => {
  const handler = toNextJsHandler(auth);
  return handler.POST(request);
};
```

### 3. Client Setup

```typescript
// lib/auth-client.ts
import { BETTER_AUTH_URL } from "@/envs-client";
import { createClientAuth } from "@template/auth/client";

export const authClient = createClientAuth(BETTER_AUTH_URL);

export const { signIn, signUp, signOut, useSession } = authClient;
```

### 4. Server Actions (App-specific)

Implement your own server actions with app-specific logic:

```typescript
// app/data/auth.ts
import { actionClient } from "@/lib/safe-action";
import { signIn, signUp } from "@/lib/auth-client";
import { signInSchema, signUpSchema } from "@template/auth/actions";

export const signInActionClient = actionClient
  .inputSchema(signInSchema)
  .action(async ({ parsedInput: formData }) => {
    try {
      await signIn.email({
        email: formData.email,
        password: formData.password,
        // Add your app-specific logic here
        // e.g., logging, analytics, custom validation
      });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to sign in",
      };
    }
  });

export const signUpActionClient = actionClient
  .inputSchema(signUpSchema)
  .action(async ({ parsedInput: formData }) => {
    try {
      await signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        // Add your app-specific logic here
        // e.g., welcome email, user preferences, role assignment
      });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to sign up",
      };
    }
  });
```

### 5. Form Components

Use the shared schemas and create your own form components:

```typescript
// components/auth/sign-in-form.tsx
"use client";

import { useForm } from "@tanstack/react-form";
import z from "zod";
import { signInActionClient } from "@/data/auth";
import { signInSchema } from "@template/auth/actions";
// ... form implementation
```

## Environment Variables

Each app needs these environment variables:

```env
# Database
DATABASE_URL=your_database_url

# Better Auth
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000

# Next.js (client-side)
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
```

## API Reference

### `createAuth(db, schema)`

Creates a Better Auth instance with your database configuration.

**Parameters:**
- `db`: Database instance (must be compatible with Drizzle ORM)
- `schema`: Database schema object

**Returns:** Better Auth instance

### `createClientAuth(baseURL)`

Creates a Better Auth client for React components.

**Parameters:**
- `baseURL`: Base URL for the auth API

**Returns:** Auth client with `signIn`, `signUp`, `signOut`, `useSession`

### Schemas & Types

```typescript
import {
  signInSchema,
  signUpSchema,
  type SignInFormData,
  type SignUpFormData
} from "@template/auth/actions";
```

## Benefits for Multiple Apps

✅ **Database Flexibility**: Each app can use its own database structure
✅ **Custom Logic**: Apps can implement custom authentication flows
✅ **Shared Schemas**: Common validation schemas across all apps
✅ **Type Safety**: Consistent TypeScript types
✅ **Maintainable**: Single source of auth logic updates

## Migration Guide

If you're migrating from the old `getAuth()` function:

```typescript
// Old (deprecated)
import { getAuth } from "@template/auth";

// New (recommended)
import { createAuth } from "@template/auth";
import { getDb } from "@/lib/db";
import * as schema from "@/lib/schema";

const auth = createAuth(getDb(), schema);
```
