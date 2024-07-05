import express from "express";
import { URLS } from "../config/constants";
import { authorize, authorizeAdmin } from "../middleware/auth-requests";
import {
  validateAdminData,
  validateUpdateAdminData,
} from "../middleware/validators";
import {
  addAdmin,
  fetchAdmin,
  fetchAdmins,
  editAdmin,
  removeAdmin,
  fetchCurrentAdmin,
} from "../controllers/admin";

const router = express.Router();

router.get(URLS.admin.me, fetchCurrentAdmin);
router
  .route(URLS.admin.all)
  .all(authorizeAdmin)
  .get(fetchAdmins)
  .post(validateAdminData, addAdmin);
router
  .route(URLS.admin.one)
  .all(authorizeAdmin)
  .get(fetchAdmin)
  .put(validateUpdateAdminData, editAdmin)
  .delete(removeAdmin);

export const admin = router;
