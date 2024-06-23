import mongoose from "mongoose";

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
    chpsCompoundId: requiredString,
  },
  { timestamps: true }
);

const resetToken = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: requiredString,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600000,
  },
});

export const User = mongoose.model("User", user);
export const ResetToken = mongoose.model("ResetToken", resetToken);
