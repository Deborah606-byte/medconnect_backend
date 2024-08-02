"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivateActiveParticipations = exports.updateParticipation = exports.createParticipation = exports.deleteChpsCompound = exports.getChpsCompoundByAuthId = exports.getChpsCompoundById = exports.getAllChpsCompounds = exports.updateChpsCompound = exports.createChpsCompound = void 0;
const chps_compound_1 = require("../models/chps-compound");
const user_1 = require("./user");
const staff_1 = require("./staff");
const index_1 = require("./index");
const createChpsCompound = async (data) => {
    const { name, email, password } = data;
    const { _id } = await (0, user_1.createUser)({ email, password, isSuperAdmin: false });
    const chpsCompound = await chps_compound_1.ChpsCompound.create({ ...data, authUserId: _id });
    const defaultStaffData = {
        email,
        fullName: name,
        contact: data.contact,
        gender: "Other",
        staffId: "default_Staff",
        position: "Staff",
        workSchedule: [],
        dateOfBirth: new Date().toISOString(),
        dateOfHire: new Date().toISOString(),
        chpsCompoundId: chpsCompound._id.toString(),
    };
    const defaultStaff = await (0, staff_1.createStaff)(defaultStaffData);
    await (0, staff_1.createRole)({ type: "Staff", staffId: defaultStaff._id.toString() });
    return {
        chpsCompound: chpsCompound.toObject(),
        staff: defaultStaff.toObject(),
    };
};
exports.createChpsCompound = createChpsCompound;
const updateChpsCompound = async (id, data) => {
    const updateData = await (0, index_1.checkUniques)({
        model: chps_compound_1.ChpsCompound,
        data,
        filter: { _id: id },
    });
    if (!updateData)
        return null;
    return await chps_compound_1.ChpsCompound.findByIdAndUpdate(id, data, { new: true });
};
exports.updateChpsCompound = updateChpsCompound;
const getAllChpsCompounds = async () => await chps_compound_1.ChpsCompound.find({});
exports.getAllChpsCompounds = getAllChpsCompounds;
const getChpsCompoundById = async (id) => await chps_compound_1.ChpsCompound.findById(id);
exports.getChpsCompoundById = getChpsCompoundById;
const getChpsCompoundByAuthId = async (id) => await chps_compound_1.ChpsCompound.findOne({ authUserId: id });
exports.getChpsCompoundByAuthId = getChpsCompoundByAuthId;
const deleteChpsCompound = async (id) => await chps_compound_1.ChpsCompound.findByIdAndDelete(id);
exports.deleteChpsCompound = deleteChpsCompound;
//OutreachParticipation
const createParticipation = async (id, data) => await chps_compound_1.OutreachParticipation.create({ ...data, chpsCompoundId: id });
exports.createParticipation = createParticipation;
const updateParticipation = async (chpsId, pid, data) => await chps_compound_1.OutreachParticipation.findOneAndUpdate({
    _id: pid,
    chpsCompoundId: chpsId,
}, data, { new: true });
exports.updateParticipation = updateParticipation;
const deactivateActiveParticipations = async (id) => await chps_compound_1.OutreachParticipation.updateMany({ outreachProgramId: id, status: true }, { $set: { status: false } });
exports.deactivateActiveParticipations = deactivateActiveParticipations;
