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
} from "../db/queries/patient";
import type { PatientData } from "../types/staff";

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
