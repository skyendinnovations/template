ALTER TABLE "admin_user" ADD COLUMN "role" text DEFAULT 'admin';--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" text DEFAULT 'user';