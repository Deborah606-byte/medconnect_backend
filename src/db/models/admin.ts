import mongoose from "mongoose";

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

export const Admin = mongoose.model("Admin", admin);
export const OutreachProgram = mongoose.model(
  "OutreachProgram",
  outreachProgram
);
