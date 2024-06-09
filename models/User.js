const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  compoundName: {
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

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("User", UserSchema);
