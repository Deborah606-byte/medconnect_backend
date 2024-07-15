import { checkUniques } from "./index";
import { Patient } from "../models/patient";
import { Prescription } from "../models/patient";
import {
  PatientData,
  PrescriptionData,
  PatientResourceParams,
} from "../../types/patient";

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

// prescriptions
export const fetchPrescriptions = async (patientId: string) =>
  await Prescription.find({ patientId });

export const fetchPrescription = async (params: PatientResourceParams) =>
  await Prescription.findOne({ patientId: params.pid, _id: params.aid });

export const createPrescription = async (
  patientId: string,
  data: PrescriptionData
) => await Prescription.create({ ...data, patientId });

export const updatePrescription = async (
  params: PatientResourceParams,
  data: PrescriptionData
) =>
  await Prescription.findOneAndUpdate(
    { _id: params.aid, patientId: params.pid },
    data,
    { new: true }
  );

export const deletePrescription = async (params: PatientResourceParams) =>
  await Prescription.findOneAndDelete({
    patientId: params.pid,
    _id: params.aid,
  });
