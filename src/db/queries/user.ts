import { User, Role, Staff } from "../models/user";
import { generateHashedPassword } from "../../utils/auth";
import type { UserData, RoleData, StaffData } from "../../types/chps-compound";

export const createRole = async (data: RoleData) => await Role.create(data);
export const createStaff = async (data: StaffData) => Staff.create(data);
export const createUser = async (data: UserData) => {
  const hashedPassword = await generateHashedPassword(data.password);
  return await User.create({ ...data, password: hashedPassword });
};
