import { Admin } from "../models/admin";
import { createUser } from "./user";
import type { AdminData, CreateAdminData } from "../../types/chps-compound";

export const createAdmin = async (data: CreateAdminData) => {
  const { email, password, name, contact } = data;
  const user = await createUser({ email, password, isSuperAdmin: true });
  return await Admin.create({ name, contact, authUserId: user._id });
};
export const getAdmin = async (id: string) => await Admin.findById(id);
export const getAdminByAuthId = async (id: string) =>
  await Admin.findOne({ authUserId: id });
export const getAdmins = async () => await Admin.find({});
export const deleteAdmin = async (id: string) =>
  await Admin.findByIdAndDelete(id);
export const updateAdmin = async (id: string, data: AdminData) =>
  await Admin.findByIdAndUpdate(id, data, { new: true });
