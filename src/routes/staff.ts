import express from "express";
import { URLS } from "../config/constants";
import { authorizeUser } from "../middleware/auth-requests";

const router = express.Router();

router
  .route(URLS.staff.all)
  .all(authorizeUser)
  .get(fetchStaff)
  .post(createStaff);

export const staff = router;
