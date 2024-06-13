import express from "express";
// const {
//   login,
//   logout,
//   forgotPassword,
//   resetPassword,
// } = require("../controllers/auth");
// const { authenticateUser } = require("../middleware/authenticateUser");
import { URLS } from "../config/constants";

const router = express.Router();

// router.post(URLS.auth.login, login);
// router.post(URLS.auth.logout, authenticateUser, logout);
// router.post(URLS.auth.forgotPassword, forgotPassword);
// router.post(URLS.auth.resetPassword, resetPassword);

export const auth = router;
