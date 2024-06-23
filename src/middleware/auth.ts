import AppError from "../utils/app-error";
import { catchAsync } from "../utils/catch-async";
import { authUtil } from "../utils/auth";
import { StatusCodes } from "http-status-codes";
import type { TokenData } from "../types/chps-compound";
import type { Request, Response, NextFunction } from "express";
import { getRoleByStaffId } from "../db/queries/staff";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer ")) {
    return next(new AppError("", StatusCodes.FORBIDDEN));
  }

  const token = auth.split(" ")[1];
  const { valid, data } = authUtil.verifyToken(token);

  if (!valid) {
    const message = "Invalid or Expired token";
    return next(new AppError(message, StatusCodes.FORBIDDEN));
  }

  req.auth = data as TokenData;
  return next();
}

export const authorizeUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id || req.body.user;
    const auth = req.auth!;

    if (auth.staff === id) return next();
    return next(new AppError("", StatusCodes.UNAUTHORIZED));
  }
);

export const authorizeAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id || req.body.user;
    const auth = req.auth!;

    const role = await getRoleByStaffId(id);
    const hasStaffAuth = auth.staff === id;
    const hasAdminAuth = role && role.type === "Admin";
    const hasAuth = hasStaffAuth && hasAdminAuth;

    if (hasAuth) return next();
    return next(new AppError("", StatusCodes.UNAUTHORIZED));
  }
);
