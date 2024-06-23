import { catchAsync } from "../utils/catch-async";
import { STATUSES } from "../config/constants";
import {
  createChpsCompound,
  getChpsCompoundById,
  getAllChpsCompounds,
  deleteChpsCompound,
  updateChpsCompound,
} from "../db/queries/chps-compound";
import type { ChpsCompundData } from "../types/chps-compound";
import AppError from "../utils/app-error";
import { StatusCodes } from "http-status-codes";

export const createCompound = catchAsync(async (req, res) => {
  const data = req.body as ChpsCompundData;
  const response = await createChpsCompound(data);
  return res.json({ status: STATUSES.SUCCESS, data: response });
});

export const getCompound = catchAsync(async (req, res, next) => {
  const compound = await getChpsCompoundById(req.params.id);
  if (!compound) {
    return next(new AppError("Compound not found", StatusCodes.NOT_FOUND));
  }

  return res.json({ status: STATUSES.SUCCESS, data: compound });
});

export const getCompounds = catchAsync(async (req, res) => {
  const compounds = await getAllChpsCompounds();
  res.json({ status: STATUSES, data: compounds });
});

export const updateCompound = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const data: ChpsCompundData = req.body;
  const updatedCompound = await updateChpsCompound(id, data);

  if (!updatedCompound) {
    return next(new AppError("Not found", StatusCodes.NOT_FOUND));
  }
  res.json({ status: STATUSES, data: updatedCompound });
});

export const deleteCompound = catchAsync(async (req, res, next) => {
  const compound = await getChpsCompoundById(req.params.id);
  if (!compound) {
    return next(new AppError("Not found", StatusCodes.NOT_FOUND));
  }

  await deleteChpsCompound(compound._id);
  return res.status(204).json({ status: STATUSES.SUCCESS });
});
