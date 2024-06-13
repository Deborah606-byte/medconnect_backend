import express from "express";
import { URLS } from "../config/constants";
// import {
//   createUser,
//   updateUser,
//   deleteUser,
//   getUserById,
//   getAllUsers,
// } from "../controllers/user";

const router = express.Router();

// router.post(URLS.user.all, createUser);
// router.get(URLS.user.all, getAllUsers);
// router.get(URLS.user.one, getUserById);
// router.put(URLS.user.one, updateUser);
// router.delete(URLS.user.one, deleteUser);

export const user = router;
