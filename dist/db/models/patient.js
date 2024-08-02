"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiagnosisReport = exports.MedicalHistory = exports.Appointment = exports.VisitLog = exports.TreatmentPlan = exports.Prescription = exports.Patient = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const app_error_1 = __importDefault(require("../../utils/app-error"));
const constants_1 = require("../../config/constants");
const id_1 = require("../../services/id");
const http_status_codes_1 = require("http-status-codes");
const requiredString = { type: String, required: true };
const requiredBool = { type: Boolean, required: true };
const requiredDate = { type: Date, required: true };
const additionals = new mongoose_1.default.Schema({
    bloodGroup: requiredString,
    allergies: { type: [String], default: [] },
    knownCondition: String,
    primaryPhysician: String,
    insuranceProvider: String,
    insurancePolicyNumber: String,
});
const emergencyContacts = new mongoose_1.default.Schema({
    name: requiredString,
    relationship: requiredString,
    address: requiredString,
    contact: requiredString,
});
const patient = new mongoose_1.default.Schema({
    patientId: requiredString,
    firstName: requiredString,
    lastName: requiredString,
    dateOfBirth: requiredString,
    gender: {
        type: String,
        required: true,
        enum: constants_1.GENDERS,
    },
    maritalStatus: {
        type: String,
        required: true,
        enum: constants_1.MARITAL_STATUSES,
    },
    nationalId: {
        ...requiredString,
        unique: true,
    },
    email: {
        ...requiredString,
        unique: true,
    },
    contact: requiredString,
    location: requiredString,
    district: requiredString,
    profilePictureUrl: {
        type: String,
        default: "",
    },
    additional: { type: additionals, required: true },
    emergencyContacts: { type: [emergencyContacts], required: true },
    chpsCompoundId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "ChpsCompound",
        required: true,
    },
}, {
    timestamps: true,
});
const medication = new mongoose_1.default.Schema({
    name: requiredString,
    dosage: requiredString,
    frequency: requiredString,
    duration: requiredString,
});
const prescription = new mongoose_1.default.Schema({
    patientId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
    },
    prescriptionId: requiredString,
    notes: requiredString,
    healthOfficialName: requiredString,
    date: requiredDate,
    medication: { type: medication, required: true },
});
const treatmentPlan = new mongoose_1.default.Schema({
    patientId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
    },
    treatmentPlanId: requiredString,
    name: requiredString,
    startDate: requiredDate,
    endDate: requiredDate,
    objective: requiredString,
    medicationName: requiredString,
    followUpSchedule: requiredString,
    notes: requiredString,
});
const diagnosisReport = new mongoose_1.default.Schema({
    patientId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
    },
    diagnosisReportId: requiredString,
    doctorName: requiredString,
    date: requiredDate,
    followUpDate: requiredDate,
    notes: requiredString,
    symptoms: requiredString,
    finalDiagnosis: requiredString,
    recommendedTest: requiredString,
});
const visitLog = new mongoose_1.default.Schema({
    patientId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
    },
    visitLogId: requiredString,
    date: requiredDate,
    purpose: requiredString,
    official: requiredString,
    notes: requiredString,
});
const appointment = new mongoose_1.default.Schema({
    patientId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
    },
    date: requiredString,
    official: requiredString,
    isClosed: {
        ...requiredBool,
        default: false,
    },
});
const medicalHistory = new mongoose_1.default.Schema({
    patientId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
    },
    description: requiredString,
    cause: requiredString,
    hospitalizationDate: requiredDate,
    formUrl: requiredString,
    date: requiredDate,
    hadSurgeryComplication: requiredBool,
    wasSurgeryRequired: requiredBool,
    hasBreathingProblem: requiredBool,
    hasSkinProblem: requiredBool,
});
patient.pre("validate", async function (next) {
    const idGenerator = new id_1.PatientIdGenerator(this, this.patientId);
    const { status, data } = await idGenerator.generate();
    if (!status) {
        const error = new app_error_1.default(data, http_status_codes_1.StatusCodes.PRECONDITION_FAILED);
        return next(error);
    }
    this.patientId = data;
    next();
});
prescription.pre("validate", async function (next) {
    const idGenerator = new id_1.PatientMiscIdGenerator("Prescription", this, this.prescriptionId);
    const { status, data } = await idGenerator.generate();
    if (!status) {
        const error = new app_error_1.default(data, http_status_codes_1.StatusCodes.PRECONDITION_FAILED);
        return next(error);
    }
    this.prescriptionId = data;
    next();
});
treatmentPlan.pre("validate", async function (next) {
    const idGenerator = new id_1.PatientMiscIdGenerator("TreatmentPlan", this, this.treatmentPlanId);
    const { status, data } = await idGenerator.generate();
    if (!status) {
        const error = new app_error_1.default(data, http_status_codes_1.StatusCodes.PRECONDITION_FAILED);
        return next(error);
    }
    this.treatmentPlanId = data;
    next();
});
visitLog.pre("validate", async function (next) {
    const idGenerator = new id_1.PatientMiscIdGenerator("VisitLog", this, this.visitLogId);
    const { status, data } = await idGenerator.generate();
    if (!status) {
        const error = new app_error_1.default(data, http_status_codes_1.StatusCodes.PRECONDITION_FAILED);
        return next(error);
    }
    this.visitLogId = data;
    next();
});
diagnosisReport.pre("validate", async function (next) {
    const idGenerator = new id_1.PatientMiscIdGenerator("DiagnosisReport", this, this.diagnosisReportId);
    const { status, data } = await idGenerator.generate();
    if (!status) {
        const error = new app_error_1.default(data, http_status_codes_1.StatusCodes.PRECONDITION_FAILED);
        return next(error);
    }
    this.diagnosisReportId = data;
    next();
});
exports.Patient = mongoose_1.default.model("Patient", patient);
exports.Prescription = mongoose_1.default.model("Prescription", prescription);
exports.TreatmentPlan = mongoose_1.default.model("TreatmentPlan", treatmentPlan);
exports.VisitLog = mongoose_1.default.model("VisitLog", visitLog);
exports.Appointment = mongoose_1.default.model("Appointment", appointment);
exports.MedicalHistory = mongoose_1.default.model("MedicalHistory", medicalHistory);
exports.DiagnosisReport = mongoose_1.default.model("DiagnosisReport", diagnosisReport);
