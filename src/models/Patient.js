const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    address: String,
    contactNumber: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    medicalHistory: [String],
    currentMedications: [String],
    allergies: [String],
    emergencyContact: {
      name: String,
      relationship: String,
      contactNumber: String,
    },
    insuranceDetails: {
      provider: String,
      policyNumber: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

patientSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
