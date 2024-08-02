"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const app_error_1 = __importDefault(require("../utils/app-error"));
const zod_1 = require("zod");
const http_status_codes_1 = require("http-status-codes");
const zod_validation_error_1 = require("zod-validation-error");
const constants_1 = require("../config/constants");
const logger_1 = require("../utils/logger");
function globalErrorHandler(error, req, res, next) {
    if (error instanceof zod_1.ZodError) {
        const errorMessages = (0, zod_validation_error_1.fromZodError)(error);
        const message = errorMessages.details;
        logger_1.logger.error({ type: "validationError", error: message });
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ status: constants_1.STATUSES.FAILED, message });
    }
    if (error.name === "MongoServerError") {
        const err = error;
        error = formatMongooseError(err);
    }
    if (error.name === "CastError" || error.name === "ValidationError") {
        const err = error;
        const key = err.message.split(": ")[1] ?? err.path;
        const message = `Invalid type provided: ${key}`;
        logger_1.logger.error({ type: "DbError", error });
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ status: constants_1.STATUSES.FAILED, message });
    }
    if (error instanceof app_error_1.default) {
        const { status, statusCode, message } = error;
        logger_1.logger.error({ type: "AppError", error: message });
        return res.status(statusCode).json({ status, message });
    }
    logger_1.logger.error({ type: "SystemError", error });
    return res
        .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ status: constants_1.STATUSES.FAILED, message: "Something went wrong" });
}
exports.globalErrorHandler = globalErrorHandler;
function formatMongooseError(error) {
    const code = error.code ?? 0;
    const keyValue = error.keyValue ?? {};
    let message = "An Error Occurred";
    if (code === 11000 || code === 11001) {
        message = `Duplicate key error ${JSON.stringify(keyValue)}`;
        return new app_error_1.default(message, http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    return new Error(message);
}
