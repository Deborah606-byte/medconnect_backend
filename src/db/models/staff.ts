import mongoose from "mongoose";
import { STAFF_ROLES } from "../../config/constants";

const requiredString = {
  type: String,
  required: true,
};

const role = new mongoose.Schema({
  type: {
    type: String,
    enum: STAFF_ROLES,
    required: true,
  },
  staffId: requiredString,
});

const staff = new mongoose.Schema(
  {
    staffID: requiredString,
    chpsCompoundId: requiredString,
    fullName: requiredString,
    dateOfBirth: requiredString,
    dateOfHire: requiredString,
    position: requiredString,
    email: {
      ...requiredString,
      unique: true,
      lowercase: true,
    },
    gender: {
      ...requiredString,
      enum: ["Male", "Female", "Other"],
    },
    workSchedule: [String],
  },
  { timestamps: true }
);

export const Role = mongoose.model("Role", role);
export const Staff = mongoose.model("Staff", staff);
