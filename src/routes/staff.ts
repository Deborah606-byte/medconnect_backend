import express from "express";
import { URLS } from "../config/constants";

const router = express.Router();

router.route(URLS.staff.all).get(fetchStaff).post(createStaff);

export const staff = router;
