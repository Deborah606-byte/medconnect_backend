import mongoose from "mongoose";
import { GENDERS, MARITAL_STATUSES } from "../../config/constants";
import AppError from "../../utils/app-error";
import { StatusCodes } from "http-status-codes";

const requiredString = { type: String, required: true };

const additionals = new mongoose.Schema({
  allergies: { type: [String], default: [] },
  knownCondition: String,
  primaryPhysician: String,
  insuranceProvider: String,
  insurancePolicyNumber: String,
});
const emergencyContacts = new mongoose.Schema({
  name: requiredString,
  relationship: requiredString,
  address: requiredString,
  contact: requiredString,
});
const patient = new mongoose.Schema(
  {
    patientId: requiredString,
    firstName: requiredString,
    lastName: requiredString,
    gender: {
      type: String,
      required: true,
      enum: GENDERS,
    },
    maritalStatus: {
      type: String,
      required: true,
      enum: MARITAL_STATUSES,
    },
    nationalId: {
      ...requiredString,
      unique: true,
    },
    email: {
      ...requiredString,
      unique: true,
    },
    contact: requiredString,
    location: requiredString,
    district: requiredString,
    profilePictureUrl: {
      type: String,
      default: "",
    },
    additional: { type: additionals, required: true },
    emergencyContacts: { type: [emergencyContacts], required: true },
    chpsCompoundId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChpsCompound",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

patient.pre("validate", async function (next) {
  if (!this.patientId) {
    try {
      const patientCount = await mongoose
        .model("Patient")
        .countDocuments({ chpsCompoundId: this.chpsCompoundId });
      const chps = await mongoose
        .model("ChpsCompound")
        .findOne({ _id: this.chpsCompoundId });
      const index = `${patientCount + 1}`.padStart(3, "0");
      this.patientId = `MDC${chps.getInitials()}${index}`;

      console.log({ validator: this });
      next();
    } catch (err) {
      const error = new AppError(
        "PatientId error",
        StatusCodes.PRECONDITION_FAILED
      );
      return next(error);
    }
  } else {
    next();
  }
});

export const Patient = mongoose.model("Patient", patient);
