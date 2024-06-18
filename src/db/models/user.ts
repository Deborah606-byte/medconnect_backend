import mongoose from "mongoose";
import { STAFF_ROLES } from "../../config/constants";

const user = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  chpsId: {
    type: String,
    required: true,
  },
});

const role = new mongoose.Schema({
  type: {
    type: String,
    enum: STAFF_ROLES,
    required: true,
  },
  staffId: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model("User", user);
export const Role = mongoose.model("Role", role);
