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
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff",
    required: true,
  },
});

const staff = new mongoose.Schema(
  {
    staffID: requiredString,
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
    chpsCompoundId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChpsCompound",
      required: true,
    },
  },
  { timestamps: true }
);

export const Role = mongoose.model("Role", role);
export const Staff = mongoose.model("Staff", staff);
