"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.medicalHistorySchema = exports.patientResourceParamsSchema = exports.appointmentSchema = exports.visitLogSchema = exports.diagnosisReportSchema = exports.treatmentPlanSchema = exports.prescriptionSchema = exports.patientSchema = void 0;
const zod_1 = require("zod");
const constants_1 = require("../../config/constants");
const additionalInfoSchema = zod_1.z
    .object({
    allergies: zod_1.z.array(zod_1.z.string()).optional(),
    bloodGroup: zod_1.z.string(),
    knownCondition: zod_1.z.string().optional(),
    primaryPhysician: zod_1.z.string().optional(),
    insuranceProvider: zod_1.z.string().optional(),
    insurancePolicyNumber: zod_1.z.string().optional(),
})
    .strict();
const emergencyInfoSchema = zod_1.z
    .object({
    name: zod_1.z.string(),
    relationship: zod_1.z.string(),
    address: zod_1.z.string(),
    contact: zod_1.z.string(),
})
    .strict();
exports.patientSchema = zod_1.z
    .object({
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    dateOfBirth: zod_1.z.string(),
    gender: zod_1.z.enum(constants_1.GENDERS),
    maritalStatus: zod_1.z.enum(constants_1.MARITAL_STATUSES),
    nationalId: zod_1.z.string().min(10),
    contact: zod_1.z.string().min(9),
    email: zod_1.z.string().email(),
    location: zod_1.z.string(),
    district: zod_1.z.string(),
    profilePictureUrl: zod_1.z.string().url().optional(),
    additional: additionalInfoSchema,
    emergencyContacts: zod_1.z.array(emergencyInfoSchema).min(1),
})
    .strict();
exports.prescriptionSchema = zod_1.z
    .object({
    healthOfficialName: zod_1.z.string(),
    date: zod_1.z.string(),
    notes: zod_1.z.string(),
    medication: zod_1.z
        .object({
        name: zod_1.z.string(),
        dosage: zod_1.z.string(),
        frequency: zod_1.z.string(),
        duration: zod_1.z.string(),
    })
        .strict(),
})
    .strict();
exports.treatmentPlanSchema = zod_1.z
    .object({
    name: zod_1.z.string(),
    startDate: zod_1.z.string(),
    endDate: zod_1.z.string(),
    objective: zod_1.z.string(),
    medicationName: zod_1.z.string(),
    followUpSchedule: zod_1.z.string(),
    notes: zod_1.z.string(),
})
    .strict()
    .refine((data) => {
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    return endDate > startDate;
}, {
    message: "endDate must be greater than startDate",
    path: ["endDate"],
});
exports.diagnosisReportSchema = zod_1.z
    .object({
    doctorName: zod_1.z.string(),
    date: zod_1.z.string(),
    followUpDate: zod_1.z.string(),
    notes: zod_1.z.string(),
    symptoms: zod_1.z.string(),
    finalDiagnosis: zod_1.z.string(),
    recommendedTest: zod_1.z.string(),
})
    .strict();
exports.visitLogSchema = zod_1.z
    .object({
    date: zod_1.z.string(),
    purpose: zod_1.z.string(),
    official: zod_1.z.string(),
    notes: zod_1.z.string(),
})
    .strict();
exports.appointmentSchema = zod_1.z
    .object({
    date: zod_1.z.string(),
    official: zod_1.z.string(),
    isClosed: zod_1.z.boolean().optional().default(false),
})
    .strict();
exports.patientResourceParamsSchema = zod_1.z
    .object({
    pid: zod_1.z.string().min(24),
    aid: zod_1.z.string().min(24),
})
    .strict();
exports.medicalHistorySchema = zod_1.z
    .object({
    description: zod_1.z.string(),
    date: zod_1.z.string(),
    cause: zod_1.z.string(),
    wasSurgeryRequired: zod_1.z.boolean(),
    hasBreathingProblem: zod_1.z.boolean(),
    hasSkinProblem: zod_1.z.boolean(),
    hospitalizationDate: zod_1.z.string(),
    hadSurgeryComplication: zod_1.z.boolean(),
    formUrl: zod_1.z.string().url(),
})
    .strict();
