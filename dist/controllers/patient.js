"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.medicalHistory = exports.diagnosisReport = exports.treatmentPlan = exports.appointment = exports.prescription = exports.visitLog = exports.editChpsPatient = exports.removeChpsPatient = exports.getChpsPatient = exports.getChpsPatients = exports.getAllPatients = exports.addPatient = void 0;
const app_error_1 = __importDefault(require("../utils/app-error"));
const catch_async_1 = require("../utils/catch-async");
const constants_1 = require("../config/constants");
const http_status_codes_1 = require("http-status-codes");
const patient_1 = require("../db/queries/patient");
exports.addPatient = (0, catch_async_1.catchAsync)(async (req, res) => {
    const { id: chpsCompoundId } = req.params;
    const data = { ...req.body, chpsCompoundId };
    const patient = await (0, patient_1.createPatient)(data);
    return res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json({ status: constants_1.STATUSES.SUCCESS, data: patient });
});
exports.getAllPatients = (0, catch_async_1.catchAsync)(async (req, res) => {
    //modify to allow only for super admins
    const patients = await (0, patient_1.fetchAllPatients)();
    return res.json({ status: constants_1.STATUSES.SUCCESS, data: patients });
});
exports.getChpsPatients = (0, catch_async_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const patients = await (0, patient_1.fetchPatientsByChpsId)(id);
    return res.json({ status: constants_1.STATUSES.SUCCESS, data: patients });
});
exports.getChpsPatient = (0, catch_async_1.catchAsync)(async (req, res, next) => {
    const { id: chpsId, pid: patientId } = req.params;
    const patient = await (0, patient_1.fetchChpsPatient)(chpsId, patientId);
    if (!patient)
        return next(new app_error_1.default("Not found", http_status_codes_1.StatusCodes.NOT_FOUND));
    return res.json({ status: constants_1.STATUSES.SUCCESS, data: patient });
});
exports.removeChpsPatient = (0, catch_async_1.catchAsync)(async (req, res, next) => {
    const { id: chpsId, pid: patientId } = req.params;
    const patient = await (0, patient_1.deleteChpsPatient)(chpsId, patientId);
    if (!patient)
        return next(new app_error_1.default("Not found", http_status_codes_1.StatusCodes.NOT_FOUND));
    return res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({ status: constants_1.STATUSES.SUCCESS });
});
exports.editChpsPatient = (0, catch_async_1.catchAsync)(async (req, res, next) => {
    const { id: chpsId, pid: patientId } = req.params;
    const data = req.body;
    const patient = await (0, patient_1.updateChpsPatient)(chpsId, patientId, data);
    if (!patient)
        return next(new app_error_1.default("Not found", http_status_codes_1.StatusCodes.NOT_FOUND));
    return res.json({ status: constants_1.STATUSES.SUCCESS, data: patient });
});
class PatientResourceController {
    constructor(instance) {
        this.getResources = (0, catch_async_1.catchAsync)(async (req, res) => {
            const patientId = req.params.pid;
            const resources = await this.instance.fetchResources(patientId);
            return res.json({ status: constants_1.STATUSES.SUCCESS, data: resources });
        });
        this.getResource = (0, catch_async_1.catchAsync)(async (req, res, next) => {
            const params = req.params;
            const resource = await this.instance.fetchResource(params);
            if (!resource)
                return next(new app_error_1.default("Not Found", http_status_codes_1.StatusCodes.NOT_FOUND));
            return res.json({ status: constants_1.STATUSES.SUCCESS, data: resource });
        });
        this.removeResource = (0, catch_async_1.catchAsync)(async (req, res, next) => {
            const params = req.params;
            const resource = await this.instance.deleteResource(params);
            if (!resource)
                return next(new app_error_1.default("Not Found", http_status_codes_1.StatusCodes.NOT_FOUND));
            return res
                .status(http_status_codes_1.StatusCodes.NO_CONTENT)
                .json({ status: constants_1.STATUSES.SUCCESS });
        });
        this.editResource = (0, catch_async_1.catchAsync)(async (req, res, next) => {
            const params = req.params;
            const data = req.body;
            const prescription = await this.instance.updateResource(params, data);
            if (!prescription)
                return next(new app_error_1.default("Not Found", http_status_codes_1.StatusCodes.NOT_FOUND));
            return res.json({ status: constants_1.STATUSES.SUCCESS, data: prescription });
        });
        this.addResource = (0, catch_async_1.catchAsync)(async (req, res) => {
            const patientId = req.params.pid;
            const data = req.body;
            const prescription = await this.instance.createResource(patientId, data);
            return res
                .status(http_status_codes_1.StatusCodes.CREATED)
                .json({ status: constants_1.STATUSES.SUCCESS, data: prescription });
        });
        this.instance = instance;
    }
}
exports.visitLog = new PatientResourceController(patient_1.VisitLogQuery);
exports.prescription = new PatientResourceController(patient_1.PresciptionQuery);
exports.appointment = new PatientResourceController(patient_1.AppointmentQuery);
exports.treatmentPlan = new PatientResourceController(patient_1.TreatmentPlanQuery);
exports.diagnosisReport = new PatientResourceController(patient_1.DiagnosisReportQuery);
exports.medicalHistory = new PatientResourceController(patient_1.MedicalHistoryQuery);
