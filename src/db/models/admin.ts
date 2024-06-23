import mongoose from "mongoose";

const admin = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    authUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    profilePictureUrl: {
      type: String,
      required: true,
      default: "",
    },
  },
  { timestamps: true }
);

export const Admin = mongoose.model("Admin", admin);
