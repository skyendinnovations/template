CREATE TABLE "demo" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"age" integer NOT NULL,
	"user" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "demo_user_unique" UNIQUE("user")
);
--> statement-breakpoint
ALTER TABLE "demo" ADD CONSTRAINT "demo_user_user_id_fk" FOREIGN KEY ("user") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;