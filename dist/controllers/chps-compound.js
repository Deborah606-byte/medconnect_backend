"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTicket = exports.getTickets = exports.addTicket = exports.updateOutreachParticipation = exports.addOutreachParticipation = exports.deleteInventory = exports.updateInventory = exports.getInventory = exports.getInventories = exports.addInventory = exports.deleteCompound = exports.updateCompound = exports.getCompounds = exports.getCompound = exports.createCompound = void 0;
const app_error_1 = __importDefault(require("../utils/app-error"));
const http_status_codes_1 = require("http-status-codes");
const catch_async_1 = require("../utils/catch-async");
const constants_1 = require("../config/constants");
const auth_1 = require("../utils/auth");
const mail_1 = require("../services/mail");
const chps_compound_1 = require("../db/queries/chps-compound");
const inventory_1 = require("../db/queries/inventory");
const admin_1 = require("../db/queries/admin");
exports.createCompound = (0, catch_async_1.catchAsync)(async (req, res) => {
    const password = auth_1.authUtil.generatetempPassword();
    const data = { ...req.body, password };
    const response = await (0, chps_compound_1.createChpsCompound)(data);
    const { name, email } = data;
    await new mail_1.NewUserNotification({ email, name, password }).sendWelcomeMail();
    return res.json({ status: constants_1.STATUSES.SUCCESS, data: response });
});
exports.getCompound = (0, catch_async_1.catchAsync)(async (req, res, next) => {
    const compound = await (0, chps_compound_1.getChpsCompoundById)(req.params.id);
    if (!compound) {
        return next(new app_error_1.default("Compound not found", http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    return res.json({ status: constants_1.STATUSES.SUCCESS, data: compound });
});
exports.getCompounds = (0, catch_async_1.catchAsync)(async (req, res) => {
    const compounds = await (0, chps_compound_1.getAllChpsCompounds)();
    res.json({ status: constants_1.STATUSES.SUCCESS, data: compounds });
});
exports.updateCompound = (0, catch_async_1.catchAsync)(async (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    const updatedCompound = await (0, chps_compound_1.updateChpsCompound)(id, data);
    if (!updatedCompound) {
        return next(new app_error_1.default("Not found", http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    res.json({ status: constants_1.STATUSES.SUCCESS, data: updatedCompound });
});
exports.deleteCompound = (0, catch_async_1.catchAsync)(async (req, res, next) => {
    const compound = await (0, chps_compound_1.getChpsCompoundById)(req.params.id);
    if (!compound) {
        return next(new app_error_1.default("Not found", http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    await (0, chps_compound_1.deleteChpsCompound)(compound._id);
    return res.status(204).json({ status: constants_1.STATUSES.SUCCESS });
});
// inventory
exports.addInventory = (0, catch_async_1.catchAsync)(async (req, res) => {
    const chpsCompoundId = req.params.id;
    const inventory = await (0, inventory_1.createInventory)({ ...req.body, chpsCompoundId });
    return res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json({ status: constants_1.STATUSES.SUCCESS, data: inventory });
});
exports.getInventories = (0, catch_async_1.catchAsync)(async (req, res) => {
    const chpsCompoundId = req.params.id;
    const compounds = await (0, inventory_1.fetchInventories)(chpsCompoundId);
    res.json({ status: constants_1.STATUSES.SUCCESS, data: compounds });
});
exports.getInventory = (0, catch_async_1.catchAsync)(async (req, res, next) => {
    const { id, vid } = req.params;
    const inventory = await (0, inventory_1.fetchChpsInventory)(id, vid);
    if (!inventory) {
        return next(new app_error_1.default("Inventory not found", http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    return res.json({ status: constants_1.STATUSES.SUCCESS, data: inventory });
});
exports.updateInventory = (0, catch_async_1.catchAsync)(async (req, res, next) => {
    const { id, vid } = req.params;
    const updatedInventory = await (0, inventory_1.updateChpsInventory)(id, vid, req.body);
    if (!updatedInventory) {
        return next(new app_error_1.default("Not found", http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    res.json({ status: constants_1.STATUSES.SUCCESS, data: updatedInventory });
});
exports.deleteInventory = (0, catch_async_1.catchAsync)(async (req, res, next) => {
    const { id, vid } = req.params;
    const inventory = await (0, inventory_1.deleteChpsInventory)(id, vid);
    if (!inventory) {
        return next(new app_error_1.default("Not found", http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    return res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({ status: constants_1.STATUSES.SUCCESS });
});
// outreach
exports.addOutreachParticipation = (0, catch_async_1.catchAsync)(async (req, res) => {
    const chpsCompoundId = req.params.id;
    const data = req.body;
    const participation = await (0, chps_compound_1.createParticipation)(chpsCompoundId, data);
    return res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json({ status: constants_1.STATUSES.SUCCESS, data: participation });
});
exports.updateOutreachParticipation = (0, catch_async_1.catchAsync)(async (req, res, next) => {
    const { id, pid } = req.params;
    const data = req.body;
    const participation = await (0, chps_compound_1.updateParticipation)(id, pid, data);
    if (!participation) {
        return next(new app_error_1.default("Not found", http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    res.json({ status: constants_1.STATUSES.SUCCESS, data: participation });
});
//ticket
exports.addTicket = (0, catch_async_1.catchAsync)(async (req, res) => {
    const chpsId = req.params.id;
    const data = req.body;
    const ticket = await (0, admin_1.createTicket)(chpsId, data);
    return res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json({ status: constants_1.STATUSES.SUCCESS, data: ticket });
});
exports.getTickets = (0, catch_async_1.catchAsync)(async (req, res) => {
    const chpsId = req.params.id;
    const tickets = await (0, admin_1.fetchChpsTickets)(chpsId);
    return res.json({ status: constants_1.STATUSES.SUCCESS, data: tickets });
});
exports.getTicket = (0, catch_async_1.catchAsync)(async (req, res, next) => {
    const { id, tid } = req.params;
    const ticket = await (0, admin_1.fetchTicket)(id, tid);
    if (!ticket) {
        return next(new app_error_1.default("Not found", http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    return res.json({ status: constants_1.STATUSES.SUCCESS, data: ticket });
});
