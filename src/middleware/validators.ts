import { z } from "zod";
import { chpsCompoundSchema } from "../db/schemas/chps-compound";
import { userSchema, loginDataSchema } from "../db/schemas/user";
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
      schema.parse(req.query);
      next();
    } catch (err) {
      next(err);
    }
  };
}

export const validateLoginData = validateData(loginDataSchema);
export const validateChpsCompoundData = validateData(
  chpsCompoundSchema.merge(userSchema.omit({ chpsCompoundId: true }))
);
