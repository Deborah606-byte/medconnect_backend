import { z } from "zod";

export const chpsCompoundSchema = z.object({
  name: z.string().min(6),
  location: z.string(),
  district: z.string(),
  region: z.string(),
  operatingHours: z.string(),
  availableServices: z.array(z.string()).default([]),
  hasAcceptedTC: z.boolean(),
});
