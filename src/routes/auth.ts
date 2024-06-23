import express from "express";
import { URLS } from "../config/constants";
import { authenticate } from "../middleware/authenticateUser";
import {
  validateLoginData,
  validateForgotPasswordData,
} from "../middleware/validators";
import { login } from "../controllers/auth";

const router = express.Router();

router.post(URLS.auth.login, validateLoginData, login);
router.post(URLS.auth.logout, authenticate);
router.post(URLS.auth.forgotPassword, validateForgotPasswordData);
// router.post(URLS.auth.resetPassword, resetPassword);

export const auth = router;
