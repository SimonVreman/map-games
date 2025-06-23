import { z } from "zod";

export const SharedScore = z.object({
  version: z.literal(1),
  accuracy: z.number().min(0).max(100),
  maxStreak: z.number().min(0),
  mistakes: z.number().min(0),
  hints: z.boolean(),
});
