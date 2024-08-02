"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const express_1 = __importDefault(require("express"));
const constants_1 = require("../config/constants");
const auth_requests_1 = require("../middleware/auth-requests");
const validators_1 = require("../middleware/validators");
const auth_1 = require("../controllers/auth");
const router = express_1.default.Router();
router.post(constants_1.URLS.auth.login, validators_1.validateLoginData, auth_1.login);
router.post(constants_1.URLS.auth.logout, auth_requests_1.authorize, auth_1.logout);
router.post(constants_1.URLS.auth.resetPassword, validators_1.validateResetPasswordData, auth_1.resetPassword);
router.post(constants_1.URLS.auth.forgotPassword, validators_1.validateForgotPasswordData, auth_1.forgotPassword);
router.get(constants_1.URLS.auth.switch, auth_requests_1.authorize, auth_1.getStaffAuth);
exports.auth = router;
