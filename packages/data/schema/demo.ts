import { integer, pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";
import { user } from "./user";

export const demo = pgTable(
  "demo",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    age: integer("age").notNull(),
    user: text("user")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
  },
  (table) => [unique("demo_user_unique").on(table.user)]
);
