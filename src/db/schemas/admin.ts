import { z } from "zod";

export const adminSchema = z.object({
  name: z.string().min(5),
  contact: z.string().min(9),
  authUserId: z.string(),
  profilePictureUrl: z.string().default(""),
});

export const createAdminSchema = z
  .object({
    name: z.string().min(5),
    email: z.string().email(),
    password: z.string().min(8),
    contact: z.string().min(9),
    profilePictureUrl: z.string().default(""),
  })
  .strict();

export const updateAmdinSchema = z
  .object({
    contact: z.string().min(9),
    profilePictureUrl: z.string().default(""),
  })
  .strict();
