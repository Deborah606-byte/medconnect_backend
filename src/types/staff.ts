import { z } from "zod";
import { patientSchema } from "../db/schemas/patient";

export type PatientData = z.infer<typeof patientSchema>;
