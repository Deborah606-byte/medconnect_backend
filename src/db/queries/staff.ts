import { Staff, Role } from "../models/staff";
import { getChpsCompoundByAuthId } from "./chps-compound";
import type { StaffData, RoleData } from "../../types/chps-compound";

//Roles
export const createRole = async (data: RoleData) => await Role.create(data);
export const getRoleByStaffId = async (id: string) =>
  await Role.findOne({ staffId: id });

//Staff
export const createStaff = async (data: StaffData) => await Staff.create(data);
export const getDefaultStaff = async (userId: string) => {
  const chps = await getChpsCompoundByAuthId(userId);
  return await Staff.findOne({
    chpsCompoundId: chps?._id,
    staffID: "default_Staff",
  });
};
