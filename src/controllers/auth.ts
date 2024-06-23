import AppError from "../utils/app-error";
import { catchAsync } from "../utils/catch-async";
import { StatusCodes } from "http-status-codes";
import { STATUSES, EMAIL } from "../config/constants";
import { EmailService } from "../services/mail";
import { authUtil } from "../utils/auth";
import { getDefaultStaff, getRoleByStaffId } from "../db/queries/staff";
import { getUserByEmail, createResetToken } from "../db/queries/user";
import type { LoginData } from "../types/chps-compound";
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
      role: role._id.toString(),
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

// // Reset Password
// // exports.resetPassword = async (req, res) => {
// //   const { token, password, email } = req.body;

// //   if (!token || !password || !email) {
// //     return res.status(400).json({
// //       message: "Token, new password and email are required.",
// //       success: false,
// //     });
// //   }

// //   try {
// //     const user = await User.findOne({ email });
// //     if (!user) {
// //       return res.status(404).json({
// //         message: "No account with that email address exists.",
// //         success: false,
// //       });
// //     }

// //     const resetToken = await ResetToken.findOne({ user: user._id, token });
// //     if (!resetToken) {
// //       return res.status(404).json({
// //         message: "No account with that email address exists.",
// //         success: false,
// //       });
// //     }

// //     const hashedPassword = await hashPassword(password);
// //     user.password = hashedPassword;
// //     await user.save();

// //     await ResetToken.deleteOne({ _id: resetToken._id });

// //     res.status(200).json({
// //       message: "Password has been changed successfully.",
// //       success: true,
// //     });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({
// //       message: "There was an error processing your request.",
// //       success: false,
// //     });
// //   }
// // };
