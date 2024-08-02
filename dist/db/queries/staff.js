"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editStaff = exports.getStaffs = exports.getDefaultStaff = exports.removeStaff = exports.createStaff = exports.getChpsStaff = exports.getStaffById = exports.updateRole = exports.getRoleByStaffId = exports.createRole = void 0;
const staff_1 = require("../models/staff");
const index_1 = require("./index");
const chps_compound_1 = require("./chps-compound");
const user_1 = require("./user");
//Roles
const createRole = async (data) => await staff_1.Role.create(data);
exports.createRole = createRole;
const getRoleByStaffId = async (id) => await staff_1.Role.findOne({ staffId: id });
exports.getRoleByStaffId = getRoleByStaffId;
const updateRole = async (data) => await staff_1.Role.findOneAndUpdate({ staffId: data.staffId }, data, { new: true });
exports.updateRole = updateRole;
//Staff
const getStaffById = async (id) => await staff_1.Staff.findById(id);
exports.getStaffById = getStaffById;
const getChpsStaff = async (cid, id) => await staff_1.Staff.find({ chpsCompoundId: cid, _id: id });
exports.getChpsStaff = getChpsStaff;
const createStaff = async (data) => {
    const staff = await staff_1.Staff.create(data);
    await (0, exports.createRole)({ type: "Staff", staffId: staff._id.toString() });
    return staff;
};
exports.createStaff = createStaff;
const removeStaff = async (cid, id) => await staff_1.Staff.findOneAndDelete({ chpsCompoundId: cid, _id: id });
exports.removeStaff = removeStaff;
const getDefaultStaff = async (userId) => {
    const chps = await (0, chps_compound_1.getChpsCompoundByAuthId)(userId);
    return await staff_1.Staff.findOne({
        chpsCompoundId: chps?._id,
        staffId: "default_Staff",
    });
};
exports.getDefaultStaff = getDefaultStaff;
const getStaffs = async (authId) => {
    const user = await (0, user_1.getUserById)(authId);
    if (user?.isSuperAdmin)
        return await staff_1.Staff.find({});
    const chps = await (0, chps_compound_1.getChpsCompoundByAuthId)(authId);
    return staff_1.Staff.find({ chpsCompoundId: chps._id });
};
exports.getStaffs = getStaffs;
const editStaff = async (cid, id, data) => {
    const updateData = await (0, index_1.checkUniques)({
        model: staff_1.Staff,
        data,
        filter: { chpsCompoundId: cid, _id: id },
    });
    if (!updateData)
        return null;
    return staff_1.Staff.findByIdAndUpdate(id, updateData, { new: true });
};
exports.editStaff = editStaff;
