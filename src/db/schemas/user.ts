import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const loginDataSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const forgotPasswordData = z.object({
  email: z.string().email(),
});

export const resetPasswordDataSchema = z.object({
  email: z.string().email(),
  token: z.string(),
  password: z.string().min(8),
});
