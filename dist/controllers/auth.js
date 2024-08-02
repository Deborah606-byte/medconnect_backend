"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStaffAuth = exports.resetPassword = exports.forgotPassword = exports.logout = exports.login = void 0;
const app_error_1 = __importDefault(require("../utils/app-error"));
const catch_async_1 = require("../utils/catch-async");
const http_status_codes_1 = require("http-status-codes");
const constants_1 = require("../config/constants");
const mail_1 = require("../services/mail");
const auth_1 = require("../utils/auth");
const user_1 = require("../db/queries/user");
const user_2 = require("../services/user");
const env_1 = require("../config/env");
exports.login = (0, catch_async_1.catchAsync)(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await (0, user_1.getUserByEmail)(email);
    if (!user) {
        return next(new app_error_1.default("User Does Not Exist", http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    const checked = await auth_1.authUtil.isPasswordValid(password, user.password);
    if (!checked) {
        return next(new app_error_1.default("Invalid email or password", http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    const authId = user._id.toString();
    const loginService = new user_2.LoginService(authId, user.isSuperAdmin);
    const actor = await loginService.getAuthedActor();
    if (!actor) {
        return next(new app_error_1.default("Error, please contact your admin", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR));
    }
    res.json({
        status: constants_1.STATUSES.SUCCESS,
        data: { ...actor, auth: { ...actor.auth, email } },
    });
});
const logout = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    auth_1.authUtil.addTokenToBlacklist(token);
    return res.json({ status: constants_1.STATUSES.SUCCESS });
};
exports.logout = logout;
exports.forgotPassword = (0, catch_async_1.catchAsync)(async (req, res, next) => {
    const email = req.body.email;
    const user = await (0, user_1.getUserByEmail)(email);
    if (!user) {
        const message = "No account with that email address exists.";
        return next(new app_error_1.default(message, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    const { token } = await (0, user_1.createResetToken)(user._id);
    const feUrl = (0, env_1.getFEUrl)();
    const emailOptions = {
        to: email,
        subject: constants_1.EMAIL.reset.subject,
        text: constants_1.EMAIL.reset.getText(token, feUrl),
    };
    const emailService = new mail_1.EmailService();
    await emailService.sendEmail(emailOptions);
    res.json({
        status: constants_1.STATUSES.SUCCESS,
        message: `Reset email sent to ${email}`,
    });
});
exports.resetPassword = (0, catch_async_1.catchAsync)(async (req, res, next) => {
    const { token, password, email } = req.body;
    const user = await (0, user_1.getUserByEmail)(email);
    if (!user) {
        const message = "User does not exist";
        return next(new app_error_1.default(message, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    const resetToken = await (0, user_1.getResetToken)(user._id, token);
    if (!resetToken) {
        const message = "Invalid or expired token";
        return next(new app_error_1.default(message, http_status_codes_1.StatusCodes.FORBIDDEN));
    }
    await (0, user_1.updateUserPassword)(user._id.toString(), password);
    await (0, user_1.deleteResetToken)(resetToken._id.toString());
    res.json({
        status: constants_1.STATUSES.SUCCESS,
        message: "Password has been changed successfully.",
    });
});
exports.getStaffAuth = (0, catch_async_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const { user } = req.auth;
    const service = new user_2.LoginService(user, false);
    const response = await service.authStaff(id);
    if (!response) {
        const error = new app_error_1.default("Auth Failed", http_status_codes_1.StatusCodes.PRECONDITION_FAILED);
        return next(error);
    }
    return res.json({ status: constants_1.STATUSES.SUCCESS, data: { ...response } });
});
