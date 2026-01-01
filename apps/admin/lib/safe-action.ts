import { createSafeActionClient } from "next-safe-action";

export const actionClient = createSafeActionClient({
  handleServerError(error) {
    console.error("handleServerError", error);
    return { message: error.message, name: error.name };
  },
});
