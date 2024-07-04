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
import { authorizeAdmin } from "../middleware/auth-requests";

const router = express.Router();

router
  .route(URLS.chps.all)
  .all(authorizeAdmin)
  .post(validateChpsCompoundData, createCompound)
  .get(getCompounds);

router
  .route(URLS.chps.one)
  .get(getCompound)
  .put(validateChpsUpdateData, updateCompound)
  .delete(authorizeAdmin, deleteCompound);

export const chps = router;
