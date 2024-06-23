import express from "express";
import { URLS } from "../config/constants";
import { authorizeUser, authorizeAdmin } from "../middleware/auth-requests";
import {
  validateAdminData,
  validateStandardParams,
} from "../middleware/validators";
import {
  addAdmin,
  fetchAdmin,
  fetchAdmins,
  editAdmin,
  removeAdmin,
} from "../controllers/admin";

const router = express.Router();

router.use(authorizeUser, authorizeAdmin);
router.get(URLS.admin.all, fetchAdmins);
router.post(URLS.admin.all, validateAdminData, addAdmin);
router.use(validateStandardParams);
router.get(URLS.admin.one, fetchAdmin);
router.get(URLS.admin.one, removeAdmin);
router.get(URLS.admin.one, editAdmin);

export const admin = router;
