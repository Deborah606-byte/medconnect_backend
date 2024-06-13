const express = require("express");
const {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
} = require("../controllers/userController");
const {
  authenticateUser,
  authorizeUser,
} = require("../middleware/authenticateUser");

const router = express.Router();

router.post("/", createUser);
router.get("/", getAllUsers);

// authentication middleware
router.use(authenticateUser);

router.get("/:id", authorizeUser, getUserById);
router.put("/:id", authorizeUser, updateUser);
router.delete("/:id", authorizeUser, deleteUser);

module.exports = router;
