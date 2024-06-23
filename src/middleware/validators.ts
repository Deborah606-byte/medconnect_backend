import { z } from "zod";
import {
  chpsCompoundSchema,
  chpsCompoundParamsSchema,
} from "../db/schemas/chps-compound";
import {
  userSchema,
  loginDataSchema,
  forgotPasswordData,
  resetPasswordDataSchema,
} from "../db/schemas/user";
import type { Request, Response, NextFunction } from "express";

function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      next(err);
    }
  };
}

function validateParams(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.params);
      next();
    } catch (err) {
      next(err);
    }
  };
}

export const validateLoginData = validateData(loginDataSchema);
export const validateForgotPasswordData = validateData(forgotPasswordData);
export const validateResetPasswordData = validateData(resetPasswordDataSchema);
export const validateChpsRequestParams = validateParams(
  chpsCompoundParamsSchema
);
export const validateChpsCompoundData = validateData(
  chpsCompoundSchema.omit({ authUserId: true }).merge(userSchema)
);
