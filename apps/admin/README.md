# Admin App

This is the admin panel for the Template application.

## Features

- Admin dashboard with key metrics
- User management
- Content management
- System settings
- Security monitoring

## Getting Started

1. Install dependencies:
   ```bash
   bun install
   ```

2. Run the development server:
   ```bash
   bun run dev
   ```

3. Open [http://localhost:3001](http://localhost:3001) in your browser.

## Environment Variables

Make sure to set up the following environment variables:

- `DATABASE_URL`: Database connection string
- `NEXT_PUBLIC_APP_URL`: Application URL (defaults to http://localhost:3001)
- `BETTER_AUTH_URL`: Better Auth URL
- `BETTER_AUTH_SECRET`: Better Auth secret
