import { Patient } from "../models/patient";
import { PatientData } from "../../types/staff";

export const createPatient = async (data: PatientData) =>
  await Patient.create(data);

export const fetchPatientsByChpsId = async (chpsId: string) =>
  await Patient.find({ chpsCompoundId: chpsId });
export const fetchPatientById = async (id: string) =>
  await Patient.findById(id);
export const fetchAllPatients = async () => await Patient.find({});
