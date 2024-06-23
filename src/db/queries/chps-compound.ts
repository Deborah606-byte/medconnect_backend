import { ChpsCompound } from "../models/chps-compound";
import { createUser } from "./user";
import { createRole, createStaff } from "./staff";
import type { ObjectId } from "mongodb";
import type { ChpsCompundData, StaffData } from "../../types/chps-compound";

export const createChpsCompound = async (data: ChpsCompundData) => {
  const chpsCompound = await ChpsCompound.create(data);

  const { name, email, password } = data;
  const chpsCompoundId = chpsCompound._id.toString();
  const defaultStaffData: StaffData = {
    email,
    chpsCompoundId,
    fullName: name,
    contact: data.contact,
    gender: "Other",
    staffID: "default_Staff",
    position: "Staff",
    dateOfBirth: new Date().toISOString(),
    dateOfHire: new Date().toISOString(),
    workSchedule: [],
  };

  const defaultStaff = await createStaff(defaultStaffData);
  await createUser({ email, password, chpsCompoundId });
  await createRole({ type: "Staff", staffId: defaultStaff._id.toString() });
  return {
    chpsCompound: chpsCompound.toObject(),
    staff: defaultStaff.toObject(),
  };
};

export const getAllChpsCompounds = async () => await ChpsCompound.find({});
export const getChpsCompoundById = async (id: string) =>
  await ChpsCompound.findById(id);
