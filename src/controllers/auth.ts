import AppError from "../utils/app-error";
import { catchAsync } from "../utils/catch-async";
import { StatusCodes } from "http-status-codes";
import { STATUSES, EMAIL } from "../config/constants";
import { EmailService } from "../services/mail";
import { authUtil } from "../utils/auth";
import { getDefaultStaff, getRoleByStaffId } from "../db/queries/staff";
import {
  getUserByEmail,
  createResetToken,
  getResetToken,
  updateUserPassword,
  deleteResetToken,
} from "../db/queries/user";
import type { LoginData, ResetPasswordData } from "../types/chps-compound";
import type { Request, Response, NextFunction } from "express";

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body as LoginData;

    const user = await getUserByEmail(email);
    if (!user) {
      return next(new AppError("User Does Not Exist", StatusCodes.NOT_FOUND));
    }

    const checked = await authUtil.isPasswordValid(password, user.password);
    if (!checked) {
      return next(
        new AppError("Invalid email or password", StatusCodes.BAD_REQUEST)
      );
    }

    const staff = await getDefaultStaff(user._id.toString(), email);
    const role = await getRoleByStaffId(staff?._id?.toString() ?? "");

    if (!staff || !role) {
      return next(
        new AppError(
          "Error, please contact your admin",
          StatusCodes.INTERNAL_SERVER_ERROR
        )
      );
    }
    const tokenData = {
      user: user._id.toString(),
      staff: staff._id.toString(),
      role: role.type,
    };
    res.json({
      status: STATUSES.SUCCESS,
      data: {
        auth: {
          email,
          id: user._id,
          role: role.type,
          token: authUtil.generateToken(tokenData),
        },
        staff: staff,
      },
    });
  }
);

export const logout = (req: Request, res: Response) => {
  const token = req.headers.authorization!.split(" ")[1];
  authUtil.addTokenToBlacklist(token);
  return res.json({ status: STATUSES.SUCCESS });
};

export const forgotPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email as string;
    const user = await getUserByEmail(email);

    if (!user) {
      const message = "No account with that email address exists.";
      return next(new AppError(message, StatusCodes.BAD_REQUEST));
    }

    const { token } = await createResetToken(user._id);
    const emailOptions = {
      to: email,
      subject: EMAIL.reset.subject,
      text: EMAIL.reset.getText(token),
    };

    const emailService = new EmailService();
    await emailService.sendEmail(emailOptions);

    res.json({
      status: STATUSES.SUCCESS,
      message: `Reset email sent to ${email}`,
    });
  }
);

export const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token, password, email } = req.body as ResetPasswordData;

    const user = await getUserByEmail(email);
    if (!user) {
      const message = "User does not exist";
      return next(new AppError(message, StatusCodes.BAD_REQUEST));
    }

    const resetToken = await getResetToken(user._id, token);
    if (!resetToken) {
      const message = "Invalid or expired token";
      return next(new AppError(message, StatusCodes.FORBIDDEN));
    }

    await updateUserPassword(user._id.toString(), password);
    await deleteResetToken(resetToken._id.toString());

    res.json({
      status: STATUSES.SUCCESS,
      message: "Password has been changed successfully.",
    });
  }
);
