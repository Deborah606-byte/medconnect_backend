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
    staffId: requiredString,
    fullName: requiredString,
    dateOfBirth: requiredString,
    dateOfHire: requiredString,
    contact: requiredString,
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

staff.pre("validate", async function (next) {
  if (!this.staffId) {
    try {
      const staffCount = await mongoose.model("Staff").countDocuments();
      const index = `${staffCount + 1}`.padStart(5, "0");
      this.staffId = "MCS" + index;
      next();
    } catch (err) {
      next(err as Error);
    }
  } else {
    next();
  }
});

export const Role = mongoose.model("Role", role);
export const Staff = mongoose.model("Staff", staff);
