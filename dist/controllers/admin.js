"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editTicket = exports.getTickets = exports.removeOutreachProgram = exports.editOutreachProgram = exports.getOutreachPrograms = exports.getOutreachProgram = exports.addOutreachProgram = exports.removeAdmin = exports.editAdmin = exports.fetchAdmins = exports.fetchCurrentAdmin = exports.fetchAdmin = exports.addAdmin = void 0;
const app_error_1 = __importDefault(require("../utils/app-error"));
const catch_async_1 = require("../utils/catch-async");
const constants_1 = require("../config/constants");
const http_status_codes_1 = require("http-status-codes");
const admin_1 = require("../db/queries/admin");
exports.addAdmin = (0, catch_async_1.catchAsync)(async (req, res) => {
    const data = req.body;
    const admin = await (0, admin_1.createAdmin)(data);
    return res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json({ status: constants_1.STATUSES.SUCCESS, data: admin });
});
exports.fetchAdmin = (0, catch_async_1.catchAsync)(async (req, res, next) => {
    const admin = await (0, admin_1.getAdmin)(req.params.id);
    if (!admin) {
        return next(new app_error_1.default("Not found", http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    return res.json({ status: constants_1.STATUSES.SUCCESS, data: admin });
});
exports.fetchCurrentAdmin = (0, catch_async_1.catchAsync)(async (req, res, next) => {
    const admin = await (0, admin_1.getAdmin)(req.auth.actor);
    if (!admin) {
        return next(new app_error_1.default("Not found", http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    return res.json({ status: constants_1.STATUSES.SUCCESS, data: admin });
});
exports.fetchAdmins = (0, catch_async_1.catchAsync)(async (req, res) => {
    const admins = await (0, admin_1.getAdmins)();
    return res.json({ status: constants_1.STATUSES.SUCCESS, data: admins });
});
exports.editAdmin = (0, catch_async_1.catchAsync)(async (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    const updatedAdmin = await (0, admin_1.updateAdmin)(id, data);
    if (!updatedAdmin) {
        return next(new app_error_1.default("Not found", http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    return res.json({ status: constants_1.STATUSES.SUCCESS, data: updatedAdmin });
});
exports.removeAdmin = (0, catch_async_1.catchAsync)(async (req, res, next) => {
    const id = req.params.id;
    const deletedAdmin = await (0, admin_1.deleteAdmin)(id);
    if (!deletedAdmin) {
        return next(new app_error_1.default("Not found", http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    return res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({ status: constants_1.STATUSES.SUCCESS });
});
// outreach program
exports.addOutreachProgram = (0, catch_async_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const program = await (0, admin_1.createOutreachProgram)(id, data);
    return res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json({ status: constants_1.STATUSES.SUCCESS, data: program });
});
exports.getOutreachProgram = (0, catch_async_1.catchAsync)(async (req, res, next) => {
    const program = await (0, admin_1.fetchOutreachProgram)(req.params.pid);
    if (!program) {
        return next(new app_error_1.default("Not found", http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    return res.json({ status: constants_1.STATUSES.SUCCESS, data: program });
});
exports.getOutreachPrograms = (0, catch_async_1.catchAsync)(async (req, res) => {
    const programs = await (0, admin_1.fetchOutreachPrograms)();
    return res.json({ status: constants_1.STATUSES.SUCCESS, data: programs });
});
exports.editOutreachProgram = (0, catch_async_1.catchAsync)(async (req, res, next) => {
    const pid = req.params.pid;
    const data = req.body;
    const program = await (0, admin_1.updateOutreachProgram)(pid, data);
    if (!program) {
        return next(new app_error_1.default("Not found", http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    return res.json({ status: constants_1.STATUSES.SUCCESS, data: program });
});
exports.removeOutreachProgram = (0, catch_async_1.catchAsync)(async (req, res, next) => {
    const program = await (0, admin_1.deleteOutreachProgram)(req.params.pid);
    if (!program) {
        return next(new app_error_1.default("Not found", http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    return res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({ status: constants_1.STATUSES.SUCCESS });
});
// ticket
exports.getTickets = (0, catch_async_1.catchAsync)(async (req, res) => {
    const tickets = await (0, admin_1.fetchTickets)();
    return res.json({ status: constants_1.STATUSES.SUCCESS, data: tickets });
});
exports.editTicket = (0, catch_async_1.catchAsync)(async (req, res, next) => {
    const ticketId = req.params.tid;
    const data = req.body;
    const ticket = await (0, admin_1.updateTicket)(ticketId, data);
    if (!ticket)
        return next(new app_error_1.default("Not found", http_status_codes_1.StatusCodes.NOT_FOUND));
    return res.json({ status: constants_1.STATUSES.SUCCESS, data: ticket });
});
