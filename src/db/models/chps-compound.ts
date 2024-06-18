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
});

export const UschpsCompound = mongoose.model("User", chpsCompound);
