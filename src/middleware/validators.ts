import { z } from "zod";
import { adminSchema } from "../db/schemas/admin";
import {
  chpsCompoundSchema,
  chpsCompoundParamsSchema,
} from "../db/schemas/chps-compound";
import {
  userSchema,
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

const standardRequestParams = z.object({
  id: z.string().min(24),
  user: z.string().min(24),
});

export const validateStandardParams = validateParams(standardRequestParams);
export const validateLoginData = validateData(userSchema);
export const validateForgotPasswordData = validateData(forgotPasswordData);
export const validateResetPasswordData = validateData(resetPasswordDataSchema);
export const validateAdminData = validateData(
  adminSchema.omit({ authUserId: true })
);
export const validateChpsUpdateData = validateData(chpsCompoundSchema);
export const validateChpsRequestParams = validateParams(
  chpsCompoundParamsSchema
);
export const validateChpsCompoundData = validateData(
  chpsCompoundSchema.omit({ authUserId: true }).merge(userSchema)
);
