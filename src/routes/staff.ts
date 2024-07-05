import express from "express";
import { URLS } from "../config/constants";
import {
  addStaff,
  getAllStaff,
  getStaff,
  updateStaff,
  deleteStaff,
} from "../controllers/staff";
import {
  validateStaffData,
  validateUpdateStaffData,
} from "../middleware/validators";
import { authorizeAdmin } from "../middleware/auth-requests";

const router = express.Router();

router
  .route(URLS.staff.all)
  .all(authorizeAdmin)
  .get(getAllStaff)
  .post(validateStaffData, addStaff);

router
  .route(URLS.staff.one)
  .get(getStaff)
  .delete(deleteStaff)
  .put(validateUpdateStaffData, updateStaff);

export const staff = router;
