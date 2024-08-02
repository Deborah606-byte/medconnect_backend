"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTicket = exports.updateTicket = exports.fetchTicket = exports.fetchChpsTickets = exports.createTicket = exports.fetchTickets = exports.deleteOutreachProgram = exports.updateOutreachProgram = exports.fetchOutreachProgram = exports.fetchOutreachPrograms = exports.createOutreachProgram = exports.updateAdmin = exports.deleteAdmin = exports.getAdmins = exports.getAdminByAuthId = exports.getAdmin = exports.createAdmin = void 0;
const admin_1 = require("../models/admin");
const user_1 = require("./user");
const chps_compound_1 = require("./chps-compound");
const createAdmin = async (data) => {
    const { email, password, name, contact } = data;
    const user = await (0, user_1.createUser)({ email, password, isSuperAdmin: true });
    return await admin_1.Admin.create({ name, contact, authUserId: user._id });
};
exports.createAdmin = createAdmin;
const getAdmin = async (id) => await admin_1.Admin.findById(id);
exports.getAdmin = getAdmin;
const getAdminByAuthId = async (id) => await admin_1.Admin.findOne({ authUserId: id });
exports.getAdminByAuthId = getAdminByAuthId;
const getAdmins = async () => await admin_1.Admin.find({});
exports.getAdmins = getAdmins;
const deleteAdmin = async (id) => await admin_1.Admin.findByIdAndDelete(id);
exports.deleteAdmin = deleteAdmin;
const updateAdmin = async (id, data) => await admin_1.Admin.findByIdAndUpdate(id, data, { new: true });
exports.updateAdmin = updateAdmin;
// outreach programs
const createOutreachProgram = async (adminId, data) => await admin_1.OutreachProgram.create({ ...data, createdById: adminId });
exports.createOutreachProgram = createOutreachProgram;
const fetchOutreachPrograms = async () => await admin_1.OutreachProgram.find({});
exports.fetchOutreachPrograms = fetchOutreachPrograms;
const fetchOutreachProgram = async (id) => await admin_1.OutreachProgram.findById(id);
exports.fetchOutreachProgram = fetchOutreachProgram;
const updateOutreachProgram = async (id, data) => await admin_1.OutreachProgram.findByIdAndUpdate(id, data, { new: true });
exports.updateOutreachProgram = updateOutreachProgram;
const deleteOutreachProgram = async (id) => {
    await (0, chps_compound_1.deactivateActiveParticipations)(id);
    return await admin_1.OutreachProgram.findByIdAndDelete(id);
};
exports.deleteOutreachProgram = deleteOutreachProgram;
// tickets
const fetchTickets = async () => await admin_1.Ticket.find({});
exports.fetchTickets = fetchTickets;
const createTicket = async (cid, data) => await admin_1.Ticket.create({ requestedById: cid, ...data });
exports.createTicket = createTicket;
const fetchChpsTickets = async (cid) => await admin_1.Ticket.find({ requestedById: cid });
exports.fetchChpsTickets = fetchChpsTickets;
const fetchTicket = async (cid, tid) => await admin_1.Ticket.findOne({ requestedById: cid, _id: tid });
exports.fetchTicket = fetchTicket;
const updateTicket = async (tid, data) => await admin_1.Ticket.findByIdAndUpdate(tid, data, { new: true });
exports.updateTicket = updateTicket;
const deleteTicket = async (tid) => await admin_1.Ticket.findByIdAndDelete(tid);
exports.deleteTicket = deleteTicket;
