import mongoose from "mongoose";
import { OUTREACH_ACTIONS } from "../../config/constants";

const requiredString = { type: String, required: true };

const admin = new mongoose.Schema(
  {
    name: requiredString,
    contact: requiredString,
    authUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    profilePictureUrl: {
      type: String,
      required: false,
      default: "",
    },
  },
  { timestamps: true }
);

const outreachProgram = new mongoose.Schema(
  {
    title: requiredString,
    description: requiredString,
    organizerName: requiredString,
    organizerPhone: requiredString,
    organization: requiredString,
    location: requiredString,
    targetGroup: requiredString,
    programDate: requiredString,
    programStartTime: requiredString,
    estimatedAudience: { type: Number, required: true },
    createdById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  { timestamps: true }
);

const outreachParticipation = new mongoose.Schema(
  {
    outreachProgramId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OutreachProgram",
      required: true,
    },
    chpsCompoundId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChpsCompound",
      required: true,
    },
    type: { type: String, enum: OUTREACH_ACTIONS, required: true },
    supportType: { type: String, required: false },
    status: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export const Admin = mongoose.model("Admin", admin);
export const OutreachProgram = mongoose.model(
  "OutreachProgram",
  outreachProgram
);
export const OutreachParticipation = mongoose.model(
  "OutreachParticipation",
  outreachParticipation
);
