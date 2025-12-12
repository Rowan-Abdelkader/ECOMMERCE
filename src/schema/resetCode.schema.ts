import { z } from "zod";
export const resetCodeSchema = z
  .object({
    resetCode: z.string().nonempty("code is required").min(4,"please enter 4 numbers"),
  })

export type resetCodeFormType = z.infer<typeof resetCodeSchema>;