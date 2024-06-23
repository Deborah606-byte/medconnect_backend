import express from "express";
import { URLS } from "../config/constants";
import {
  createCompound,
  getCompound,
  getCompounds,
  deleteCompound,
} from "../controllers/chps-compound";
import {
  validateChpsCompoundData,
  validateChpsRequestParams,
} from "../middleware/validators";
import { authorizeAdmin, authorizeUser } from "../middleware/auth-requests";

const router = express.Router();

router.post(
  URLS.chps.all,
  validateChpsCompoundData,
  authorizeAdmin,
  createCompound
);
router.use(validateChpsRequestParams, authorizeUser);
router.get(URLS.chps.one, getCompound);
router.get(URLS.chps.all, authorizeAdmin, getCompounds);
router.delete(URLS.chps.one, authorizeAdmin, deleteCompound);

// router.put(URLS.user.one, updateUser);

export const chps = router;
