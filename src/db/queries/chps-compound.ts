import { ChpsCompound } from "../models/chps-compound";
import { createUser, createRole, createStaff } from "./user";
import type { ChpsCompundData, StaffData } from "../../types/chps-compound";

export const createChpsCompound = async (data: ChpsCompundData) => {
  const chpsCompound = await ChpsCompound.create(data);

  const { name, email, password } = data;
  const chpsCompoundId = chpsCompound._id.toString();
  const defaultStaffData: StaffData = {
    email,
    chpsCompoundId,
    fullName: name,
    gender: "Other",
    staffID: "default_Staff",
    dateOfBirth: new Date().toISOString(),
    dateOfHire: new Date().toISOString(),
    position: "Staff",
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
