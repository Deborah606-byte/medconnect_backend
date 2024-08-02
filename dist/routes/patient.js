"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patient = void 0;
const express_1 = __importDefault(require("express"));
const constants_1 = require("../config/constants");
const auth_requests_1 = require("../middleware/auth-requests");
const validators_1 = require("../middleware/validators");
const patient_1 = require("../controllers/patient");
const router = express_1.default.Router();
router.route(constants_1.URLS.patient.all).all(auth_requests_1.authorizeAdmin).get(patient_1.getAllPatients);
router
    .route(constants_1.URLS.patient.chps.all)
    .get(patient_1.getChpsPatients)
    .post(validators_1.validatePatientData, patient_1.addPatient);
router
    .route(constants_1.URLS.patient.chps.one)
    .get(patient_1.getChpsPatient)
    .delete(patient_1.removeChpsPatient)
    .patch(validators_1.validatePatientData, patient_1.editChpsPatient);
// prescription
router
    .route(constants_1.URLS.patient.prescription.all)
    .get(patient_1.prescription.getResources)
    .post(validators_1.validatePresciptionData, patient_1.prescription.addResource);
router
    .route(constants_1.URLS.patient.prescription.one)
    .all(validators_1.validatePatientResourceParams)
    .get(patient_1.prescription.getResource)
    .patch(validators_1.validatePresciptionData, patient_1.prescription.editResource)
    .delete(patient_1.prescription.removeResource);
// treatment-plans
router
    .route(constants_1.URLS.patient.treatmentPlan.all)
    .get(patient_1.treatmentPlan.getResources)
    .post(validators_1.validateTreatmentPlanData, patient_1.treatmentPlan.addResource);
router
    .route(constants_1.URLS.patient.treatmentPlan.one)
    .all(validators_1.validatePatientResourceParams)
    .get(patient_1.treatmentPlan.getResource)
    .patch(validators_1.validateTreatmentPlanData, patient_1.treatmentPlan.editResource)
    .delete(patient_1.treatmentPlan.removeResource);
// diagnosis-report
router
    .route(constants_1.URLS.patient.diagnosisReport.all)
    .get(patient_1.diagnosisReport.getResources)
    .post(validators_1.validateDiagnosisReportData, patient_1.diagnosisReport.addResource);
router
    .route(constants_1.URLS.patient.diagnosisReport.one)
    .all(validators_1.validatePatientResourceParams)
    .get(patient_1.diagnosisReport.getResource)
    .patch(validators_1.validateDiagnosisReportData, patient_1.diagnosisReport.editResource)
    .delete(patient_1.diagnosisReport.removeResource);
// visit-log
router
    .route(constants_1.URLS.patient.visitLog.all)
    .get(patient_1.visitLog.getResources)
    .post(validators_1.validateVisitLogsData, patient_1.visitLog.addResource);
router
    .route(constants_1.URLS.patient.visitLog.one)
    .all(validators_1.validatePatientResourceParams)
    .get(patient_1.visitLog.getResource)
    .patch(validators_1.validateVisitLogsData, patient_1.visitLog.editResource)
    .delete(patient_1.visitLog.removeResource);
// appointment
router
    .route(constants_1.URLS.patient.appointment.all)
    .get(patient_1.appointment.getResources)
    .post(validators_1.validateAppointmentData, patient_1.appointment.addResource);
router
    .route(constants_1.URLS.patient.appointment.one)
    .all(validators_1.validatePatientResourceParams)
    .get(patient_1.appointment.getResource)
    .patch(validators_1.validateAppointmentData, patient_1.appointment.editResource)
    .delete(patient_1.appointment.removeResource);
//medical-history
router
    .route(constants_1.URLS.patient.medicalHistory.all)
    .get(patient_1.medicalHistory.getResources)
    .post(validators_1.validateMedicalHistoryData, patient_1.medicalHistory.addResource);
router
    .route(constants_1.URLS.patient.medicalHistory.one)
    .all(validators_1.validatePatientResourceParams)
    .get(patient_1.medicalHistory.getResource)
    .patch(validators_1.validateMedicalHistoryData, patient_1.medicalHistory.editResource)
    .delete(patient_1.medicalHistory.removeResource);
exports.patient = router;
