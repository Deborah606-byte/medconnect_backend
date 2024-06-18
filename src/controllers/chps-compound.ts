import { createChpsCompound } from "../db/queries/chps-compound";
import { catchAsync } from "../utils/catch-async";
import { STATUSES } from "../config/constants";
import type { NextFunction, Request, Response } from "express";
import type { ChpsCompundData } from "../types/chps-compound";

export const createChps = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body as ChpsCompundData;
    const response = await createChpsCompound(data);
    return res.json({ status: STATUSES.SUCCESS, data: response });
  }
);

// Get user by id
// exports.getUserById = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res
//         .status(404)
//         .json({ message: "User not found", success: false });
//     }
//     res.status(200).json({
//       message: "User retrieved successfully",
//       data: getUser(user),
//       success: true,
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message, success: false });
//   }
// };

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

// Get all users
// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find({}).select("-password");
//     res.json({
//       message: "Users retrieved successfully",
//       data: users.map((user) => getUser(user)),
//       success: true,
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message, success: false });
//   }
// };
