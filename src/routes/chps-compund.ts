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
  validateChpsUpdateData,
} from "../middleware/validators";
import { authorizeAdmin, authorizeUser } from "../middleware/auth-requests";

const router = express.Router();

router
  .route(URLS.chps.all)
  .all(authorizeAdmin)
  .post(validateChpsCompoundData, createCompound)
  .get(getCompounds);

router
  .route(URLS.chps.one)
  .all(authorizeUser)
  .get(getCompound)
  .put(validateChpsUpdateData, updateCompound);

router.delete(URLS.chps.one, authorizeAdmin, deleteCompound);

export const chps = router;
