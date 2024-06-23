import express from "express";
import { URLS } from "../config/constants";
import {
  createCompound,
  getCompound,
  getCompounds,
  deleteCompound,
  updateCompound,
} from "../controllers/chps-compound";
import {
  validateChpsCompoundData,
  validateChpsRequestParams,
  validateChpsUpdateData,
} from "../middleware/validators";
import { authorizeAdmin, authorizeUser } from "../middleware/auth-requests";

const router = express.Router();

router.post(
  URLS.chps.all,
  authorizeAdmin,
  validateChpsCompoundData,
  createCompound
);
router.use(authorizeUser, validateChpsRequestParams);
router.get(URLS.chps.one, getCompound);
router.put(URLS.chps.one, validateChpsUpdateData, updateCompound);
router.get(URLS.chps.all, authorizeAdmin, getCompounds);
router.delete(URLS.chps.one, authorizeAdmin, deleteCompound);

export const chps = router;
