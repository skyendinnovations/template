"use server";

import { auth } from "@/lib/auth";
import getDb from "@/lib/db";
import { actionClient } from "@/lib/safe-action";
import { user } from "@template/data/schema";
import { desc } from "drizzle-orm";

export const getAllUserNames = actionClient.action(async () => {
  const session = await auth();
  console.log("Session:", session);

  const db = getDb();

  const users = await db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    })
    .from(user)
    .orderBy(desc(user.createdAt));
  return users.map((u) => ({
    id: u.id,
    name: u.name ?? "Unknown User",
    email: u.email,
    createdAt: u.createdAt,
  }));
});
