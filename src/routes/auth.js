const express = require("express");
const {
  login,
  logout,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");
const { authenticateUser } = require("../util/middleware");
const { URLS } = require("../data/constants");

const router = express.Router();

router.post(URLS.login, login);
router.post(URLS.logout, authenticateUser, logout);
router.post(URLS.forgotPassword, forgotPassword);
router.post(URLS.resetPassword, resetPassword);

module.exports.authApi = router;
