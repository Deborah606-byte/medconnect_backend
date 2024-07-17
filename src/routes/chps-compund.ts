import express from "express";
import { URLS } from "../config/constants";
import {
  createCompound,
  getCompound,
  getCompounds,
  deleteCompound,
  updateCompound,
  addInventory,
  getInventory,
  getInventories,
  updateInventory,
  deleteInventory,
} from "../controllers/chps-compound";
import {
  validateChpsCompoundData,
  validateChpsUpdateData,
  validateInventoryData,
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

router
  .route(URLS.chps.inventory.all)
  .get(getInventories)
  .post(validateInventoryData, addInventory);
router
  .route(URLS.chps.inventory.one)
  .get(getInventory)
  .patch(validateInventoryData, updateInventory)
  .delete(deleteInventory);

export const chps = router;
