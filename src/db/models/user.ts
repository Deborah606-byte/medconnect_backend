import mongoose from "mongoose";
import { STAFF_ROLES } from "../../config/constants";

const requiredString = {
  type: String,
  required: true,
};

const user = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    password: requiredString,
    chpsId: requiredString,
  },
  { timestamps: true }
);

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
    chpsId: requiredString,
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

export const User = mongoose.model("User", user);
export const Role = mongoose.model("Role", role);
export const Staff = mongoose.model("Staff", staff);
