const express = require("express");
const { URLS } = require("../data/constants");
const {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getAllUsers,
} = require("../controllers/user");

const router = express.Router();

router.post(URLS.user.all, createUser);
router.get(URLS.user.all, getAllUsers);
router.get(URLS.user.one, getUserById);
router.put(URLS.user.one, updateUser);
router.delete(URLS.user.one, deleteUser);

module.exports.user = router;
