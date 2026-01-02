"use server";

import { actionClient } from "@/lib/safe-action";
import { demoSchema } from "@/lib/schemas";
import { getDb } from "@/lib/db";
import { demo } from "@template/data/schema";
import { eq } from "drizzle-orm";

export const createDemoAction = actionClient
  .inputSchema(demoSchema)
  .action(async ({ parsedInput: formData }) => {
    try {
      const db = getDb();

      // Check if user already has a demo record
      const existingDemo = await db
        .select()
        .from(demo)
        .where(eq(demo.user, formData.user))
        .limit(1);

      if (existingDemo.length > 0) {
        return {
          success: false,
          error: "This user already has a demo record",
        };
      }

      // Create new demo record
      const newDemo = await db
        .insert(demo)
        .values({
          id: crypto.randomUUID(),
          name: formData.name,
          email: formData.email,
          age: formData.age,
          user: formData.user,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();

      return {
        success: true,
        data: newDemo[0],
      };
    } catch (error) {
      console.error("Failed to create demo record:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to create demo record",
      };
    }
  });

export const getUsersAction = actionClient.action(async () => {
  try {
    const db = getDb();
    const users = await db.query.user.findMany({
      columns: {
        id: true,
        name: true,
        email: true,
      },
    });

    return {
      success: true,
      data: users,
    } as const;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return {
      success: false,
      data: undefined,
      error: error instanceof Error ? error.message : "Failed to fetch users",
    } as const;
  }
});
