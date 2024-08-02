"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editRole = exports.deleteStaff = exports.updateStaff = exports.getStaff = exports.getAllStaff = exports.addStaff = void 0;
const app_error_1 = __importDefault(require("../utils/app-error"));
const catch_async_1 = require("../utils/catch-async");
const constants_1 = require("../config/constants");
const http_status_codes_1 = require("http-status-codes");
const staff_1 = require("../db/queries/staff");
exports.addStaff = (0, catch_async_1.catchAsync)(async (req, res) => {
    const data = req.body;
    const staff = await (0, staff_1.createStaff)(data);
    return res.json({ status: constants_1.STATUSES.SUCCESS, data: staff });
});
exports.getAllStaff = (0, catch_async_1.catchAsync)(async (req, res) => {
    const { user } = req.auth;
    const staffs = await (0, staff_1.getStaffs)(user);
    return res.json({ status: constants_1.STATUSES.SUCCESS, data: staffs });
});
exports.getStaff = (0, catch_async_1.catchAsync)(async (req, res, next) => {
    const { id: chpsId, sid: staffId } = req.params;
    const staff = await (0, staff_1.getChpsStaff)(chpsId, staffId);
    if (!staff) {
        const error = new app_error_1.default("Staff not found", http_status_codes_1.StatusCodes.NOT_FOUND);
        return next(error);
    }
    return res.json({ status: constants_1.STATUSES.SUCCESS, data: staff });
});
exports.updateStaff = (0, catch_async_1.catchAsync)(async (req, res, next) => {
    const { id: chpsId, sid: staffId } = req.params;
    const data = req.body;
    const updatedStaff = await (0, staff_1.editStaff)(chpsId, staffId, data);
    if (!updatedStaff) {
        return next(new app_error_1.default("Not found", http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    return res.json({ status: constants_1.STATUSES.SUCCESS, data: updatedStaff });
});
exports.deleteStaff = (0, catch_async_1.catchAsync)(async (req, res, next) => {
    const { id: chpsId, sid: staffId } = req.params;
    const staff = await (0, staff_1.removeStaff)(chpsId, staffId);
    if (!staff) {
        return next(new app_error_1.default("Not found", http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    return res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({ status: constants_1.STATUSES.SUCCESS });
});
exports.editRole = (0, catch_async_1.catchAsync)(async (req, res, next) => {
    const data = req.body;
    const updatedRole = await (0, staff_1.updateRole)(data);
    if (!updatedRole) {
        return next(new app_error_1.default("Not found", http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    return res.json({ status: constants_1.STATUSES.SUCCESS, data: updatedRole });
});
