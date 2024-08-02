"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Staff = exports.Role = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const app_error_1 = __importDefault(require("../../utils/app-error"));
const constants_1 = require("../../config/constants");
const id_1 = require("../../services/id");
const http_status_codes_1 = require("http-status-codes");
const requiredString = {
    type: String,
    required: true,
};
const role = new mongoose_1.default.Schema({
    type: {
        type: String,
        enum: constants_1.STAFF_ROLES,
        required: true,
    },
    staffId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Staff",
        required: true,
    },
});
const staff = new mongoose_1.default.Schema({
    staffId: requiredString,
    fullName: requiredString,
    dateOfBirth: requiredString,
    dateOfHire: requiredString,
    contact: requiredString,
    position: requiredString,
    email: {
        ...requiredString,
        unique: true,
        lowercase: true,
    },
    gender: {
        ...requiredString,
        enum: ["Male", "Female", "Other"],
    },
    workSchedule: [String],
    chpsCompoundId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "ChpsCompound",
        required: true,
    },
}, { timestamps: true });
staff.pre("validate", async function (next) {
    const idGenerator = new id_1.StaffIdGenerator(this, this.staffId);
    const { status, data } = await idGenerator.generate();
    if (!status) {
        const error = new app_error_1.default(data, http_status_codes_1.StatusCodes.PRECONDITION_FAILED);
        return next(error);
    }
    this.staffId = data;
    next();
});
exports.Role = mongoose_1.default.model("Role", role);
exports.Staff = mongoose_1.default.model("Staff", staff);
