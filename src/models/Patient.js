const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    compoundId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Compound ID is required"],
    },
    firstName: String,
    lastName: String,
    dateOfBirth: String,
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: [true, "Gender is required"],
    },
    address: String,
    contactNumber: String,
    email: {
      type: String,
      unique: [true, "Email already exists"],
      required: [true, "Email is required"],
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

patientSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
