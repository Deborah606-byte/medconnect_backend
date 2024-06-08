const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  compoundName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  operatingHours: {
    type: String,
    required: true,
  },
  availableServices: [
    {
      type: [String],
    },
  ],
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  termsAndConditions: {
    type: Boolean,
    required: true,
  },
});

// Pre-save hook to hash passwords
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("User", UserSchema);
