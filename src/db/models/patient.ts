import mongoose from "mongoose";
import AppError from "../../utils/app-error";
import { GENDERS, MARITAL_STATUSES } from "../../config/constants";
import { IDGenerator } from "../../services/id";
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
  const idGenerator = new IDGenerator("Staff", this, this.patientId);
  const { status, data } = await idGenerator.generate();

  if (!status) {
    const error = new AppError(data, StatusCodes.PRECONDITION_FAILED);
    return next(error);
  }

  this.patientId = data;
  next();
});

export const Patient = mongoose.model("Patient", patient);
