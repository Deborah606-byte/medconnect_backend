import { User, Role, Staff } from "../models/user";
import { generateHashedPassword } from "../../utils/auth";
import type { UserData, RoleData, StaffData } from "../../types/chps-compound";

export const createRole = async (data: RoleData) => await Role.create(data);
export const getRoleByStaffId = async (id: string) =>
  await Role.findOne({ staffId: id });

export const createStaff = async (data: StaffData) => await Staff.create(data);
export const getDefaultStaff = async (userId: string, email: string) =>
  await Staff.findOne({ userId, email, staffID: "default_Staff" });

// User
export const createUser = async (data: UserData) => {
  const hashedPassword = await generateHashedPassword(data.password);
  return await User.create({ ...data, password: hashedPassword });
};
export const getUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};
