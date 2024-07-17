import { catchAsync } from "../utils/catch-async";
import { STATUSES } from "../config/constants";
import {
  createChpsCompound,
  getChpsCompoundById,
  getAllChpsCompounds,
  deleteChpsCompound,
  updateChpsCompound,
  createParticipation,
  updateParticipation,
} from "../db/queries/chps-compound";
import type {
  ChpsCompundData,
  UpdateChpsCompoundData,
} from "../types/chps-compound";
import AppError from "../utils/app-error";
import { StatusCodes } from "http-status-codes";
import {
  createInventory,
  fetchChpsInventory,
  fetchInventories,
  updateChpsInventory,
  deleteChpsInventory,
} from "../db/queries/inventory";

export const createCompound = catchAsync(async (req, res) => {
  const data = req.body as ChpsCompundData;
  //gen temp password
  const response = await createChpsCompound(data);
  // send welcome email
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
  res.json({ status: STATUSES.SUCCESS, data: compounds });
});

export const updateCompound = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const data: UpdateChpsCompoundData = req.body;
  const updatedCompound = await updateChpsCompound(id, data);

  if (!updatedCompound) {
    return next(new AppError("Not found", StatusCodes.NOT_FOUND));
  }
  res.json({ status: STATUSES.SUCCESS, data: updatedCompound });
});

export const deleteCompound = catchAsync(async (req, res, next) => {
  const compound = await getChpsCompoundById(req.params.id);
  if (!compound) {
    return next(new AppError("Not found", StatusCodes.NOT_FOUND));
  }

  await deleteChpsCompound(compound._id);
  return res.status(204).json({ status: STATUSES.SUCCESS });
});

export const addInventory = catchAsync(async (req, res) => {
  const chpsCompoundId = req.params.id;
  const inventory = await createInventory({ ...req.body, chpsCompoundId });
  return res
    .status(StatusCodes.CREATED)
    .json({ status: STATUSES.SUCCESS, data: inventory });
});

export const getInventories = catchAsync(async (req, res) => {
  const chpsCompoundId = req.params.id;
  const compounds = await fetchInventories(chpsCompoundId);
  res.json({ status: STATUSES.SUCCESS, data: compounds });
});

export const getInventory = catchAsync(async (req, res, next) => {
  const { id, vid } = req.params;
  const inventory = await fetchChpsInventory(id, vid);
  if (!inventory) {
    return next(new AppError("Inventory not found", StatusCodes.NOT_FOUND));
  }
  return res.json({ status: STATUSES.SUCCESS, data: inventory });
});

export const updateInventory = catchAsync(async (req, res, next) => {
  const { id, vid } = req.params;
  const updatedInventory = await updateChpsInventory(id, vid, req.body);

  if (!updatedInventory) {
    return next(new AppError("Not found", StatusCodes.NOT_FOUND));
  }
  res.json({ status: STATUSES.SUCCESS, data: updatedInventory });
});

export const deleteInventory = catchAsync(async (req, res, next) => {
  const { id, vid } = req.params;
  const inventory = await deleteChpsInventory(id, vid);
  if (!inventory) {
    return next(new AppError("Not found", StatusCodes.NOT_FOUND));
  }
  return res.status(StatusCodes.NO_CONTENT).json({ status: STATUSES.SUCCESS });
});

export const addOutreachParticipation = catchAsync(async (req, res) => {
  const chpsCompoundId = req.params.id;
  const data = req.body;
  const participation = await createParticipation(chpsCompoundId, data);
  return res
    .status(StatusCodes.CREATED)
    .json({ status: STATUSES.SUCCESS, data: participation });
});

export const updateOutreachParticipation = catchAsync(
  async (req, res, next) => {
    const { id, pid } = req.params;
    const data = req.body;
    const participation = await updateParticipation(id, pid, data);

    if (!participation) {
      return next(new AppError("Not found", StatusCodes.NOT_FOUND));
    }
    res.json({ status: STATUSES.SUCCESS, data: participation });
  }
);
