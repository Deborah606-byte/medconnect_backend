"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientMiscIdGenerator = exports.TicketIdGenerator = exports.PatientIdGenerator = exports.StaffIdGenerator = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = require("../utils/logger");
class BaseIDGenerator {
    constructor(instance, idx) {
        this.prefix = "MDC";
        this.currentId = undefined;
        this.error = "";
        this.setError = () => (this.error = `Failed to generate id for ${this.modelName?.toLowerCase()}`);
        this.generate = async () => {
            if (this.currentId)
                return { status: true, data: this.currentId };
            const status = await this.generateId();
            if (!status)
                return { status, data: this.error };
            return { status, data: this.currentId };
        };
        this.modelInstance = instance;
        this.currentId = idx;
        this.setError();
    }
}
class StaffIdGenerator extends BaseIDGenerator {
    constructor(instance, idx) {
        super(instance, idx);
        this.modelName = "Staff";
        this.generateId = async () => {
            try {
                const staffCount = await mongoose_1.default
                    .model(this.modelName)
                    .countDocuments({ chpsCompoundId: this.modelInstance.chpsCompoundId });
                const index = `${staffCount + 1}`.padStart(4, "0");
                this.currentId = `${this.prefix}S${index}`;
                return true;
            }
            catch (err) {
                const { message } = err;
                logger_1.logger.error({ action: "generateStaffId", msg: message });
                return false;
            }
        };
        this.setError();
    }
}
exports.StaffIdGenerator = StaffIdGenerator;
class PatientIdGenerator extends BaseIDGenerator {
    constructor(instance, idx) {
        super(instance, idx);
        this.modelName = "Patient";
        this.generateId = async () => {
            try {
                const patientCount = await mongoose_1.default.model(this.modelName).countDocuments({
                    chpsCompoundId: this.modelInstance.chpsCompoundId,
                });
                const chps = await mongoose_1.default
                    .model("ChpsCompound")
                    .findOne({ _id: this.modelInstance.chpsCompoundId });
                const index = `${patientCount + 1}`.padStart(3, "0");
                this.currentId = this.prefix + chps.getInitials() + index;
                return true;
            }
            catch (err) {
                const { message } = err;
                logger_1.logger.error({ action: "generatePatientId", msg: message });
                return false;
            }
        };
        this.setError();
    }
}
exports.PatientIdGenerator = PatientIdGenerator;
class TicketIdGenerator extends BaseIDGenerator {
    constructor(instance, idx) {
        super(instance, idx);
        this.modelName = "Ticket";
        this.generateId = async () => {
            try {
                const ticketCount = await mongoose_1.default.model(this.modelName).countDocuments();
                const index = `-${ticketCount + 1}`.padStart(4, "0");
                this.currentId = this.prefix + index;
                return true;
            }
            catch (err) {
                const { message } = err;
                logger_1.logger.error({ action: "generateTicketId", msg: message });
                return false;
            }
        };
        this.setError();
    }
}
exports.TicketIdGenerator = TicketIdGenerator;
class PatientMiscIdGenerator extends BaseIDGenerator {
    constructor(name, instance, idx) {
        super(instance, idx);
        this.prefixes = {
            Prescription: "RX",
            TreatmentPlan: "TP",
            VisitLog: "VL",
            DiagnosisReport: "DR",
        };
        this.generateId = async () => {
            try {
                const itemsCount = await mongoose_1.default.model(this.modelName).countDocuments();
                const index = `${itemsCount + 1}`.padStart(5, "0");
                this.currentId = this.prefix + this.prefixes[this.modelName] + index;
                return true;
            }
            catch (err) {
                const { message } = err;
                logger_1.logger.error({ action: "generatePatientId", msg: message });
                return false;
            }
        };
        this.modelName = name;
        this.setError();
    }
}
exports.PatientMiscIdGenerator = PatientMiscIdGenerator;
