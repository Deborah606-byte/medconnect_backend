import { Staff, Role } from "../models/staff";
import { getChpsCompoundByAuthId } from "./chps-compound";
import { getUserById } from "./user";
import type { StaffData, RoleData } from "../../types/chps-compound";

//Roles
export const createRole = async (data: RoleData) => await Role.create(data);
export const getRoleByStaffId = async (id: string) =>
  await Role.findOne({ staffId: id });

//Staff
export const getStaffById = async (id: string) => await Staff.findById(id);
export const createStaff = async (data: StaffData) => await Staff.create(data);
export const removeStaff = async (id: string) =>
  await Staff.findByIdAndDelete(id);
export const editStaff = async (id: string, data: StaffData) =>
  await Staff.findByIdAndUpdate(id, data, { new: true });
export const getDefaultStaff = async (userId: string) => {
  const chps = await getChpsCompoundByAuthId(userId);
  return await Staff.findOne({
    chpsCompoundId: chps?._id,
    staffID: "default_Staff",
  });
};
export const getStaffs = async (authId: string) => {
  const user = await getUserById(authId);
  if (user?.isSuperAdmin) return await Staff.find({});

  const chps = await getChpsCompoundByAuthId(authId);
  return Staff.find({ chpsCompoundId: chps!._id });
};
