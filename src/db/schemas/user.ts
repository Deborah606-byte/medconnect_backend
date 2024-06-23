import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  chpsCompoundId: z.string(),
});

export const loginDataSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const forgotPasswordData = z.object({
  email: z.string().email(),
});
