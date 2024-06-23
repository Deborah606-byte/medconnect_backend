import express from "express";
import { URLS } from "../config/constants";
import { auth } from "./auth";
import { chps } from "./chps-compund";
import { inquiry } from "./inquiry";
import { patient } from "./patient";
import { prescription } from "./prescription";
import { authenticate, authorizeUser } from "../middleware/auth";

const router = express.Router();

router.use(URLS.auth.root, auth);
router.use(URLS.chps.root, authenticate, authorizeUser, chps);
router.use(URLS.patient.root, authenticate, authorizeUser, patient);
router.use(URLS.inquiry.root, authenticate, authorizeUser, inquiry);
router.use(URLS.prescription.root, authenticate, authorizeUser, prescription);

export const api = router;
