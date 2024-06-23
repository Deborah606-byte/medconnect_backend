import express from "express";
import { URLS } from "../config/constants";
import {
  createChps,
  getChpsCompound,
  getChpsCompounds,
} from "../controllers/chps-compound";
import { validateChpsCompoundData } from "../middleware/validators";
import { authorizeAdmin } from "../middleware/auth";

const router = express.Router();

router.post(URLS.chps.all, validateChpsCompoundData, createChps);
router.get(URLS.chps.all, authorizeAdmin, getChpsCompounds);
router.get(URLS.chps.one, getChpsCompound);
// router.put(URLS.user.one, updateUser);
// router.delete(URLS.user.one, deleteUser);

export const chps = router;
