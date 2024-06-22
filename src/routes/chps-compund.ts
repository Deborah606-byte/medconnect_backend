import express from "express";
import { URLS } from "../config/constants";
import { createChps } from "../controllers/chps-compound";
import { validateChpsCompoundData } from "../middleware/validators";

const router = express.Router();

router.post(URLS.chps.all, validateChpsCompoundData, createChps);
// router.get(URLS.user.all, getAllUsers);
// router.get(URLS.user.one, getUserById);
// router.put(URLS.user.one, updateUser);
// router.delete(URLS.user.one, deleteUser);

export const chps = router;
