import AppError from "../utils/app-error";
import { ZodError } from "zod";
import { StatusCodes } from "http-status-codes";
import { fromZodError } from "zod-validation-error";
import { STATUSES } from "../config/constants";
import { logger } from "../utils/logger";
import type { Request, Response, NextFunction } from "express";

type MongooseError = Error & {
  code?: number;
  keyValue: Record<string, unknown>;
};

export default function globalErrorHandler(
  error: Error | ZodError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof ZodError) {
    const errorMessages = fromZodError(error);
    const message = errorMessages.details;
    logger.error({ type: "validationError", error: message });

    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ status: STATUSES.FAILED, message });
  }

  if (error.name == "MongoServerError") {
    const err = error as MongooseError;
    error = formatMongooseError(err);
  }

  if (error instanceof AppError) {
    const { status, statusCode, message } = error;
    logger.error({ type: "dbError", error: message });
    return res.status(statusCode).json({ status, message });
  }

  logger.error({ type: "SystemError", error: error.message });

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ status: STATUSES.FAILED, message: "Internal Server Error" });
}

function formatMongooseError(error: MongooseError) {
  const code = error.code ?? 0;
  const keyValue = error.keyValue ?? {};

  let message = "An Error Occurred";

  if (code === 11000 || code === 11001) {
    message = `Duplicate key error ${JSON.stringify(keyValue)}`;
    return new AppError(message, StatusCodes.BAD_REQUEST);
  }

  return new Error(message);
}
