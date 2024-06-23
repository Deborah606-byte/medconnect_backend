import express from "express";
import { URLS } from "../config/constants";
import {
  createChps,
  getChpsCompound,
  getChpsCompounds,
} from "../controllers/chps-compound";
import {
  validateChpsCompoundData,
  validateChpsRequestParams,
} from "../middleware/validators";

const router = express.Router();

router.post(URLS.chps.all, validateChpsCompoundData, createChps);
router.get(
  URLS.chps.all,
  validateChpsRequestParams,
  authorizeAdmin,
  getChpsCompounds
);
router.get(URLS.chps.one, validateChpsRequestParams, getChpsCompound);
router.delete(URLS.chps.one, validateChpsRequestParams, authorizeAdmin);
// router.put(URLS.user.one, updateUser);

export const chps = router;
