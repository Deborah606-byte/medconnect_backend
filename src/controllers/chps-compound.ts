import { catchAsync } from "../utils/catch-async";
import { STATUSES } from "../config/constants";
import {
  createChpsCompound,
  getChpsCompoundById,
  getAllChpsCompounds,
  deleteChpsCompound,
} from "../db/queries/chps-compound";
import type { NextFunction, Request, Response } from "express";
import type { ChpsCompundData } from "../types/chps-compound";
import AppError from "../utils/app-error";
import { StatusCodes } from "http-status-codes";

export const createCompound = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body as ChpsCompundData;
    const response = await createChpsCompound(data);
    return res.json({ status: STATUSES.SUCCESS, data: response });
  }
);

export const getCompound = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const compound = await getChpsCompoundById(req.params.id);
    if (!compound) {
      return next(new AppError("Compound not found", StatusCodes.NOT_FOUND));
    }

    return res.json({ status: STATUSES.SUCCESS, data: compound });
  }
);

export const getCompounds = catchAsync(async (req, res) => {
  const compounds = await getAllChpsCompounds();
  res.json({ status: STATUSES, data: compounds });
});

// Update an existing user
// exports.updateUser = async (req, res) => {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true } // Returns the updated document
//     );
//     if (!updatedUser) {
//       return res
//         .status(404)
//         .json({ message: "User not found", success: false });
//     }
//     res.json({
//       message: "User updated successfully",
//       data: getUser(updatedUser),
//       success: true,
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message, success: false });
//   }
// };

export const deleteCompound = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const compound = await getChpsCompoundById(req.params.id);
    if (!compound) {
      return next(new AppError("Not found", StatusCodes.NOT_FOUND));
    }

    await deleteChpsCompound(compound._id);
    return res.status(204).json({ status: STATUSES.SUCCESS });
  }
);
