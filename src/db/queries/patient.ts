import { Patient } from "../models/patient";
import { PatientData } from "../../types/staff";
import { checkUniques } from "./index";

export const createPatient = async (data: PatientData) =>
  await Patient.create(data);

export const fetchPatientsByChpsId = async (chpsId: string) =>
  await Patient.find({ chpsCompoundId: chpsId });
export const fetchPatientById = async (id: string) =>
  await Patient.findById(id);
export const fetchAllPatients = async () => await Patient.find({});

export const fetchChpsPatient = async (chpsId: string, id: string) =>
  await Patient.find({ chpsCompoundId: chpsId, _id: id });

export const deleteChpsPatient = async (chpsId: string, id: string) =>
  await Patient.findOneAndDelete({ chpsCompoundId: chpsId, _id: id });

export const updateChpsPatient = async (
  chpsId: string,
  id: string,
  data: PatientData
) => {
  const updateData = await checkUniques({
    model: Patient,
    data,
    filter: { chpsCompoundId: chpsId, _id: id },
  });

  if (!updateData) return null;
  return Patient.findByIdAndUpdate(id, updateData, { new: true });
};
