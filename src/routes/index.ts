import express from "express";
import { URLS } from "../config/constants";
import { auth } from "./auth";
import { admin } from "./admin";
import { chps } from "./chps-compund";
import { inquiry } from "./inquiry";
import { patient } from "./patient";
import { prescription } from "./prescription";
import { authenticate } from "../middleware/auth-requests";

const router = express.Router();

router.use(URLS.auth.root, auth);
router.use(URLS.admin.root, authenticate, admin);
router.use(URLS.chps.root, authenticate, chps);
router.use(URLS.patient.root, authenticate, patient);
router.use(URLS.inquiry.root, authenticate, inquiry);
router.use(URLS.prescription.root, authenticate, prescription);

export const api = router;
