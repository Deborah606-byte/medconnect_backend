import AppError from "../utils/app-error";
import { catchAsync } from "../utils/catch-async";
import { STATUSES } from "../config/constants";
import { StatusCodes } from "http-status-codes";
import {
  createAdmin,
  getAdmin,
  getAdmins,
  updateAdmin,
  deleteAdmin,
} from "../db/queries/admin";
import type { AdminData, CreateAdminData } from "../types/chps-compound";

export const addAdmin = catchAsync(async (req, res) => {
  const data = req.body as CreateAdminData;
  const admin = await createAdmin(data);
  return res
    .status(StatusCodes.CREATED)
    .json({ status: STATUSES.SUCCESS, data: admin });
});

export const fetchAdmin = catchAsync(async (req, res, next) => {
  const admin = await getAdmin(req.params.id);
  if (!admin) {
    return next(new AppError("Not found", StatusCodes.NOT_FOUND));
  }
  return res.json({ status: STATUSES.SUCCESS, data: admin });
});
export const fetchCurrentAdmin = catchAsync(async (req, res, next) => {
  const admin = await getAdmin(req.auth!.actor);
  if (!admin) {
    return next(new AppError("Not found", StatusCodes.NOT_FOUND));
  }
  return res.json({ status: STATUSES.SUCCESS, data: admin });
});

export const fetchAdmins = catchAsync(async (req, res) => {
  const admins = await getAdmins();
  return res.json({ status: STATUSES.SUCCESS, data: admins });
});

export const editAdmin = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const data = req.body as AdminData;
  const updatedAdmin = await updateAdmin(id, data);

  if (!updatedAdmin) {
    return next(new AppError("Not found", StatusCodes.NOT_FOUND));
  }
  return res.json({ status: STATUSES.SUCCESS, data: updatedAdmin });
});

export const removeAdmin = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const deletedAdmin = await deleteAdmin(id);

  if (!deletedAdmin) {
    return next(new AppError("Not found", StatusCodes.NOT_FOUND));
  }
  return res.status(StatusCodes.NO_CONTENT).json({ status: STATUSES.SUCCESS });
});
