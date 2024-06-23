import mongoose from "mongoose";

const requiredString = {
  type: String,
  required: true,
};

const chpsCompound = new mongoose.Schema({
  name: {
    unique: true,
    ...requiredString,
  },
  contact: requiredString,
  emergencyContact: requiredString,
  location: requiredString,
  region: requiredString,
  district: requiredString,
  operatingHours: requiredString,
  availableServices: {
    type: [String],
    default: [],
  },
  hasAcceptedTC: {
    type: Boolean,
    required: true,
  },
  profilePictureUrl: {
    type: String,
    default: "",
  },
  authUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const ChpsCompound = mongoose.model("ChpsCompound", chpsCompound);
