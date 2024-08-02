"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePatientResourceParams = exports.validateMedicalHistoryData = exports.validateVisitLogsData = exports.validateDiagnosisReportData = exports.validateTreatmentPlanData = exports.validateAppointmentData = exports.validatePresciptionData = exports.validatePatientData = exports.validateOutreachParticipationData = exports.validateChpsCompoundData = exports.validateAddTicketData = exports.validateChpsRequestParams = exports.validateChpsUpdateData = exports.validateInventoryData = exports.validateUpdateStaffData = exports.validateRoleData = exports.validateStaffData = exports.validateAdminData = exports.validateUpdateTicketData = exports.validateUpdateAdminData = exports.validateOutreachProgramData = exports.validateResetPasswordData = exports.validateForgotPasswordData = exports.validateLoginData = exports.validateStandardParams = void 0;
const zod_1 = require("zod");
const admin_1 = require("../db/schemas/admin");
const staff_1 = require("../db/schemas/staff");
const inventory_1 = require("../db/schemas/inventory");
const chps_compound_1 = require("../db/schemas/chps-compound");
const user_1 = require("../db/schemas/user");
const patient_1 = require("../db/schemas/patient");
function validateData(schema) {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (err) {
            next(err);
        }
    };
}
function validateParams(schema) {
    return (req, res, next) => {
        try {
            schema.parse(req.params);
            next();
        }
        catch (err) {
            next(err);
        }
    };
}
const standardRequestParams = zod_1.z.object({
    id: zod_1.z.string().min(24),
    user: zod_1.z.string().min(24),
});
//general
exports.validateStandardParams = validateParams(standardRequestParams);
//auth
exports.validateLoginData = validateData(user_1.userSchema);
exports.validateForgotPasswordData = validateData(user_1.forgotPasswordData);
exports.validateResetPasswordData = validateData(user_1.resetPasswordDataSchema);
//admin
exports.validateOutreachProgramData = validateData(admin_1.outreachProgramSchema);
exports.validateUpdateAdminData = validateData(admin_1.updateAmdinSchema);
exports.validateUpdateTicketData = validateData(admin_1.updateTicketSchema);
exports.validateAdminData = validateData(admin_1.adminSchema.omit({ authUserId: true }));
//staff
exports.validateStaffData = validateData(staff_1.staffSchema);
exports.validateRoleData = validateData(staff_1.roleSchema);
exports.validateUpdateStaffData = validateData(staff_1.staffSchema.merge(zod_1.z.object({ staffId: zod_1.z.string() })));
//chps
exports.validateInventoryData = validateData(inventory_1.inventorySchema);
exports.validateChpsUpdateData = validateData(chps_compound_1.updateChpsCompoundSchema);
exports.validateChpsRequestParams = validateParams(standardRequestParams);
exports.validateAddTicketData = validateData(chps_compound_1.addTicketSchema);
exports.validateChpsCompoundData = validateData(chps_compound_1.chpsCompoundSchema
    .omit({ authUserId: true })
    .merge(user_1.userSchema.omit({ password: true })));
exports.validateOutreachParticipationData = validateData(admin_1.outreachParticipationSchema);
// Patient
exports.validatePatientData = validateData(patient_1.patientSchema);
exports.validatePresciptionData = validateData(patient_1.prescriptionSchema);
exports.validateAppointmentData = validateData(patient_1.appointmentSchema);
exports.validateTreatmentPlanData = validateData(patient_1.treatmentPlanSchema);
exports.validateDiagnosisReportData = validateData(patient_1.diagnosisReportSchema);
exports.validateVisitLogsData = validateData(patient_1.visitLogSchema);
exports.validateMedicalHistoryData = validateData(patient_1.medicalHistorySchema);
exports.validatePatientResourceParams = validateParams(patient_1.patientResourceParamsSchema);
