import { z } from "zod";
import { GENDERS, MARITAL_STATUSES } from "../../config/constants";

const additionalInfoSchema = z.object({
  allergies: z.array(z.string()).optional(),
  knownCondition: z.string().optional(),
  primaryPhysician: z.string().optional(),
  insuranceProvider: z.string().optional(),
  insurancePolicyNumber: z.string().optional(),
});
const emergencyInfoSchema = z.object({
  name: z.string(),
  relationship: z.string(),
  address: z.string(),
  contact: z.string(),
});
export const patientSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    gender: z.enum(GENDERS),
    maritalStatus: z.enum(MARITAL_STATUSES),
    nationalId: z.string().min(10),
    contact: z.string().min(9),
    email: z.string().email(),
    location: z.string(),
    district: z.string(),
    profilePictureUrl: z.string().optional().default(""),
    additional: additionalInfoSchema,
    emergencyContacts: z.array(emergencyInfoSchema).min(1),
  })
  .strict();
