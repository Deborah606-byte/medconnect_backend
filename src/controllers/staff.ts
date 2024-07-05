import AppError from "../utils/app-error";
import { catchAsync } from "../utils/catch-async";
import { STATUSES } from "../config/constants";
import { StatusCodes } from "http-status-codes";
import {
  createStaff,
  getStaffs,
  getStaffById,
  editStaff,
  removeStaff,
} from "../db/queries/staff";
import type { StaffData } from "../types/chps-compound";

export const addStaff = catchAsync(async (req, res) => {
  const data = req.body as StaffData;
  const staff = await createStaff(data);
  return res.json({ status: STATUSES.SUCCESS, data: staff });
});
export const getAllStaff = catchAsync(async (req, res) => {
  const { user } = req.auth!;
  const staffs = await getStaffs(user);
  return res.json({ status: STATUSES.SUCCESS, data: staffs });
});

export const getStaff = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const staff = await getStaffById(id);

  if (!staff) {
    const error = new AppError("Staff not found", StatusCodes.NOT_FOUND);
    return next(error);
  }

  return res.json({ status: STATUSES.SUCCESS, data: staff });
});

export const updateStaff = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  const updatedStaff = await editStaff(id, data);

  if (!updatedStaff) {
    return next(new AppError("Not found", StatusCodes.NOT_FOUND));
  }

  return res.json({ status: STATUSES.SUCCESS, data: updatedStaff });
});

export const deleteStaff = catchAsync(async (req, res, next) => {
  const staff = await removeStaff(req.params.id);
  if (!staff) {
    return next(new AppError("Not found", StatusCodes.NOT_FOUND));
  }
  return res.status(StatusCodes.NO_CONTENT).json({ status: STATUSES.SUCCESS });
});
