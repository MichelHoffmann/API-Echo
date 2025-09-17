import * as z from "zod";

export const userSchema = z.object({
  name: z.string().min(3, "Name must be at leats 3 characters long"),
  email: z.email(),
  password: z.string().min(6),
});
