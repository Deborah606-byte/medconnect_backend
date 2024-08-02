"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../config/constants");
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = constants_1.STATUSES.FAILED;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = AppError;
