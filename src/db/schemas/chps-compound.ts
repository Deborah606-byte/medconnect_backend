import { z } from "zod";

export const chpsCompoundSchema = z
  .object({
    name: z.string().min(6),
    contact: z.string().min(9),
    emergencyContact: z.string().min(9),
    location: z.string(),
    district: z.string(),
    region: z.string(),
    operatingHours: z.string(),
    availableServices: z.array(z.string()).default([]),
    hasAcceptedTC: z.boolean(),
    profilePictureUrl: z.string().default(""),
    authUserId: z.string(),
    createdById: z.string(),
  })
  .strict();

export const chpsCompoundParamsSchema = z.object({
  id: z.string(),
  user: z.string(),
});
