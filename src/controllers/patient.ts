import AppError from "../utils/app-error";
import { catchAsync } from "../utils/catch-async";
import { STATUSES } from "../config/constants";
import { StatusCodes } from "http-status-codes";
import {
  createPatient,
  fetchAllPatients,
  fetchPatientsByChpsId,
  fetchChpsPatient,
  deleteChpsPatient,
  updateChpsPatient,
  fetchPrescriptions,
  fetchPrescription,
  createPrescription,
  updatePrescription,
  deletePrescription,
} from "../db/queries/patient";
import type {
  PatientData,
  PatientResourceParams,
  PrescriptionData,
} from "../types/patient";

export const addPatient = catchAsync(async (req, res) => {
  const { id: chpsCompoundId } = req.params;
  const data = { ...(req.body as PatientData), chpsCompoundId };
  const patient = await createPatient(data);

  return res
    .status(StatusCodes.CREATED)
    .json({ status: STATUSES.SUCCESS, data: patient });
});

export const getAllPatients = catchAsync(async (req, res) => {
  //modify to allow only for super admins
  const patients = await fetchAllPatients();
  return res.json({ status: STATUSES.SUCCESS, data: patients });
});

export const getChpsPatients = catchAsync(async (req, res) => {
  const { id } = req.params;
  const patients = await fetchPatientsByChpsId(id);
  return res.json({ status: STATUSES.SUCCESS, data: patients });
});

export const getChpsPatient = catchAsync(async (req, res, next) => {
  const { id: chpsId, pid: patientId } = req.params;
  const patient = await fetchChpsPatient(chpsId, patientId);

  if (!patient) return next(new AppError("Not found", StatusCodes.NOT_FOUND));
  return res.json({ status: STATUSES.SUCCESS, data: patient });
});

export const removeChpsPatient = catchAsync(async (req, res, next) => {
  const { id: chpsId, pid: patientId } = req.params;
  const patient = await deleteChpsPatient(chpsId, patientId);

  if (!patient) return next(new AppError("Not found", StatusCodes.NOT_FOUND));
  return res.status(StatusCodes.NO_CONTENT).json({ status: STATUSES.SUCCESS });
});

export const editChpsPatient = catchAsync(async (req, res, next) => {
  const { id: chpsId, pid: patientId } = req.params;
  const data = req.body as PatientData;
  const patient = await updateChpsPatient(chpsId, patientId, data);

  if (!patient) return next(new AppError("Not found", StatusCodes.NOT_FOUND));
  return res.json({ status: STATUSES.SUCCESS, data: patient });
});

// Presciption
export const getPresciptions = catchAsync(async (req, res) => {
  const patientId = req.params.pid;
  const prescriptions = await fetchPrescriptions(patientId);
  return res.json({ status: STATUSES.SUCCESS, data: prescriptions });
});

export const getPresciption = catchAsync(async (req, res, next) => {
  const params = req.params as PatientResourceParams;
  const prescription = await fetchPrescription(params);

  if (!prescription)
    return next(new AppError("Not Found", StatusCodes.NOT_FOUND));

  return res.json({ status: STATUSES.SUCCESS, data: prescription });
});

export const addPrescription = catchAsync(async (req, res) => {
  const patientId = req.params.pid;
  const data = req.body as PrescriptionData;
  const prescription = await createPrescription(patientId, data);
  return res
    .status(StatusCodes.CREATED)
    .json({ status: STATUSES.SUCCESS, data: prescription });
});

export const editPrescription = catchAsync(async (req, res, next) => {
  const params = req.params as PatientResourceParams;
  const data = req.body as PrescriptionData;
  const prescription = await updatePrescription(params, data);

  if (!prescription)
    return next(new AppError("Not Found", StatusCodes.NOT_FOUND));

  return res.json({ status: STATUSES.SUCCESS, data: prescription });
});

export const removePrescription = catchAsync(async (req, res, next) => {
  const params = req.params as PatientResourceParams;
  const prescription = await deletePrescription(params);

  if (!prescription)
    return next(new AppError("Not Found", StatusCodes.NOT_FOUND));

  return res.status(StatusCodes.NO_CONTENT).json({ status: STATUSES.SUCCESS });
});
