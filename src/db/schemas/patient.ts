import { z } from "zod";
import { GENDERS, MARITAL_STATUSES } from "../../config/constants";

const additionalInfoSchema = z
  .object({
    allergies: z.array(z.string()).optional(),
    bloodGroup: z.string(),
    knownCondition: z.string().optional(),
    primaryPhysician: z.string().optional(),
    insuranceProvider: z.string().optional(),
    insurancePolicyNumber: z.string().optional(),
  })
  .strict();
const emergencyInfoSchema = z
  .object({
    name: z.string(),
    relationship: z.string(),
    address: z.string(),
    contact: z.string(),
  })
  .strict();
export const patientSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    dateOfBirth: z.string(),
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

export const prescriptionSchema = z
  .object({
    healthOfficialName: z.string(),
    date: z.string(),
    notes: z.string(),
    medication: z
      .object({
        name: z.string(),
        dosage: z.string(),
        frequency: z.string(),
        duration: z.string(),
      })
      .strict(),
  })
  .strict();
export const treatmentPlanSchema = z
  .object({
    name: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    objective: z.string(),
    medicationName: z.string(),
    followUpSchedule: z.string(),
    notes: z.string(),
  })
  .strict();
export const diagnosisReportSchema = z
  .object({
    doctorName: z.string(),
    date: z.string(),
    followUpDate: z.string(),
    notes: z.string(),
    symptoms: z.string(),
    recommendedTest: z.string(),
  })
  .strict();
export const visitLogSchema = z
  .object({
    date: z.string(),
    purpose: z.string(),
    official: z.string(),
    notes: z.string(),
  })
  .strict();
export const appointmentSchema = z
  .object({
    date: z.string(),
    official: z.string(),
  })
  .strict();

export const patientResourceParamsSchema = z
  .object({
    pid: z.string().min(24),
    aid: z.string().min(24),
  })
  .strict();
