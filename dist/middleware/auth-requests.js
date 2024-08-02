"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeAdmin = exports.authorize = void 0;
const app_error_1 = __importDefault(require("../utils/app-error"));
const catch_async_1 = require("../utils/catch-async");
const auth_1 = require("../utils/auth");
const http_status_codes_1 = require("http-status-codes");
function authorize(req, res, next) {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) {
        return next(new app_error_1.default("Not allowed", http_status_codes_1.StatusCodes.UNAUTHORIZED));
    }
    const token = auth.split(" ")[1];
    const { valid, data } = auth_1.authUtil.verifyToken(token);
    if (!valid) {
        const message = "Invalid or Expired token";
        return next(new app_error_1.default(message, http_status_codes_1.StatusCodes.FORBIDDEN));
    }
    req.auth = data;
    return next();
}
exports.authorize = authorize;
exports.authorizeAdmin = (0, catch_async_1.catchAsync)(async (req, res, next) => {
    const auth = req.auth;
    if (auth.role === "Admin")
        return next();
    return next(new app_error_1.default("Not allowed", http_status_codes_1.StatusCodes.UNAUTHORIZED));
});
