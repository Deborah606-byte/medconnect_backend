const express = require("express");
const {
  login,
  forgotPassword,
  resetPassword,
  logout,
} = require("../controllers/authController");
const { authenticateUser } = require("../middleware/authenticateUser");

const router = express.Router();

router.post("/login", login);
router.post("/logout", authenticateUser, logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
