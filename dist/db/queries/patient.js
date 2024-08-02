"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalHistoryQuery = exports.AppointmentQuery = exports.VisitLogQuery = exports.DiagnosisReportQuery = exports.PresciptionQuery = exports.TreatmentPlanQuery = exports.PatientResourceQuery = exports.updateChpsPatient = exports.deleteChpsPatient = exports.fetchChpsPatient = exports.fetchAllPatients = exports.fetchPatientById = exports.fetchPatientsByChpsId = exports.createPatient = void 0;
const index_1 = require("./index");
const patient_1 = require("../models/patient");
const patient_2 = require("../models/patient");
const createPatient = async (data) => await patient_1.Patient.create(data);
exports.createPatient = createPatient;
const fetchPatientsByChpsId = async (chpsId) => await patient_1.Patient.find({ chpsCompoundId: chpsId });
exports.fetchPatientsByChpsId = fetchPatientsByChpsId;
const fetchPatientById = async (id) => await patient_1.Patient.findById(id);
exports.fetchPatientById = fetchPatientById;
const fetchAllPatients = async () => await patient_1.Patient.find({});
exports.fetchAllPatients = fetchAllPatients;
const fetchChpsPatient = async (chpsId, id) => await patient_1.Patient.find({ chpsCompoundId: chpsId, _id: id });
exports.fetchChpsPatient = fetchChpsPatient;
const deleteChpsPatient = async (chpsId, id) => await patient_1.Patient.findOneAndDelete({ chpsCompoundId: chpsId, _id: id });
exports.deleteChpsPatient = deleteChpsPatient;
const updateChpsPatient = async (chpsId, id, data) => {
    const updateData = await (0, index_1.checkUniques)({
        model: patient_1.Patient,
        data,
        filter: { chpsCompoundId: chpsId, _id: id },
    });
    if (!updateData)
        return null;
    return await patient_1.Patient.findByIdAndUpdate(id, updateData, { new: true });
};
exports.updateChpsPatient = updateChpsPatient;
class PatientResourceQuery {
    constructor(model) {
        this.fetchResources = async (patientId) => await this.model.find({ patientId });
        this.fetchResource = async (params) => await this.model.findOne({ patientId: params.pid, _id: params.aid });
        this.createResource = async (patientId, data) => await this.model.create({ ...data, patientId });
        this.deleteResource = async (params) => await this.model.findOneAndDelete({
            patientId: params.pid,
            _id: params.aid,
        });
        this.updateResource = async (params, data) => await this.model.findOneAndUpdate({ _id: params.aid, patientId: params.pid }, data, { new: true, runValidators: true });
        this.model = model;
    }
}
exports.PatientResourceQuery = PatientResourceQuery;
exports.TreatmentPlanQuery = new PatientResourceQuery(patient_2.TreatmentPlan);
exports.PresciptionQuery = new PatientResourceQuery(patient_2.Prescription);
exports.DiagnosisReportQuery = new PatientResourceQuery(patient_1.DiagnosisReport);
exports.VisitLogQuery = new PatientResourceQuery(patient_1.VisitLog);
exports.AppointmentQuery = new PatientResourceQuery(patient_1.Appointment);
exports.MedicalHistoryQuery = new PatientResourceQuery(patient_1.MedicalHistory);
