"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutreachProgram = exports.Ticket = exports.Admin = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const app_error_1 = __importDefault(require("../../utils/app-error"));
const constants_1 = require("../../config/constants");
const id_1 = require("../../services/id");
const http_status_codes_1 = require("http-status-codes");
const requiredString = { type: String, required: true };
const admin = new mongoose_1.default.Schema({
    name: requiredString,
    contact: requiredString,
    authUserId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    profilePictureUrl: {
        type: String,
        required: false,
        default: "",
    },
}, { timestamps: true });
const outreachProgram = new mongoose_1.default.Schema({
    title: requiredString,
    description: requiredString,
    organizerName: requiredString,
    organizerPhone: requiredString,
    organization: requiredString,
    location: requiredString,
    targetGroup: requiredString,
    programDate: requiredString,
    programStartTime: requiredString,
    estimatedAudience: { type: Number, required: true },
    createdById: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
    },
}, { timestamps: true });
const ticket = new mongoose_1.default.Schema({
    ticketId: requiredString,
    subject: requiredString,
    description: requiredString,
    imageUrl: requiredString,
    requestedById: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "ChpsCompund",
        required: true,
    },
    status: {
        type: String,
        enum: constants_1.TICKET_STATUSES,
        default: constants_1.TICKET_STATUSES[0],
    },
    priority: {
        type: String,
        enum: constants_1.TICKET_PRIORITY,
        default: constants_1.TICKET_PRIORITY[0],
    },
}, { timestamps: true });
ticket.pre("validate", async function (next) {
    const idGenerator = new id_1.TicketIdGenerator(this, this.ticketId);
    const { status, data } = await idGenerator.generate();
    if (!status) {
        const error = new app_error_1.default(data, http_status_codes_1.StatusCodes.PRECONDITION_FAILED);
        return next(error);
    }
    this.ticketId = data;
    next();
});
exports.Admin = mongoose_1.default.model("Admin", admin);
exports.Ticket = mongoose_1.default.model("Ticket", ticket);
exports.OutreachProgram = mongoose_1.default.model("OutreachProgram", outreachProgram);
