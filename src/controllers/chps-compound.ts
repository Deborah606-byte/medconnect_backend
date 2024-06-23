import { catchAsync } from "../utils/catch-async";
import { STATUSES } from "../config/constants";
import {
  createChpsCompound,
  getChpsCompoundById,
  getAllChpsCompounds,
} from "../db/queries/chps-compound";
import type { NextFunction, Request, Response } from "express";
import type { ChpsCompundData } from "../types/chps-compound";
import AppError from "../utils/app-error";
import { StatusCodes } from "http-status-codes";

export const createChps = catchAsync(async (req: Request, res: Response) => {
  const data = req.body as ChpsCompundData;
  const response = await createChpsCompound(data);
  return res.json({ status: STATUSES.SUCCESS, data: response });
});

export const getChpsCompound = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const compound = await getChpsCompoundById(req.params.id);
    if (!compound) {
      return next(new AppError("Compound not found", StatusCodes.NOT_FOUND));
    }

    return res.json({ status: STATUSES.SUCCESS, data: compound });
  }
);

export const getChpsCompounds = catchAsync(async (req, res) => {
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

// Delete an existing user
// exports.deleteUser = async (req, res) => {
//   try {
//     const deletedUser = await User.findByIdAndDelete(req.params.id);
//     if (!deletedUser) {
//       return res
//         .status(404)
//         .json({ message: "User not found", success: false });
//     }
//     res.json({
//       message: "User deleted successfully",
//       data: getUser(deletedUser),
//       success: true,
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message, success: false });
//   }
// };
