import { z } from "zod";
import { STAFF_ROLES } from "../../config/constants";

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  chpsCompoundId: z.string(),
});

export const roleSchema = z.object({
  type: z.enum(STAFF_ROLES),
  staffId: z.string(),
});

export const staffSchema = z.object({
  staffID: z.string(),
  fullName: z.string(),
  dateOfBirth: z.string(),
  dateOfHire: z.string(),
  position: z.string(),
  email: z.string().email(),
  gender: z.enum(["Male", "Female", "Other"]),
  workSchedule: z.array(z.string()),
  chpsCompoundId: z.string(),
});

export const loginDataSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
