import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Compound Name is required"],
    unique: [true, "Compound Name already exists"],
  },
  location: {
    type: String,
    required: [true, "Location is required"],
  },
  region: {
    type: String,
    required: [true, "Region is required"],
  },
  district: {
    type: String,
    required: [true, "District is required"],
  },
  operatingHours: {
    type: String,
    required: [true, "Operating Hours is required"],
  },
  availableServices: {
    type: [String],
    default: [],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  termsAndConditions: {
    type: Boolean,
    required: [true, "Terms and Conditions is required"],
  },
});

export const User = mongoose.model("User", UserSchema);
