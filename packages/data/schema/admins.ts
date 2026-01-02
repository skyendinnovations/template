import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./user";

export const admins = pgTable("admins", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" })
    .unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export type Admins = typeof admins.$inferSelect;
export type NewAdmin = typeof admins.$inferInsert;
