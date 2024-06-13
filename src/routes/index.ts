import express from "express";
import { URLS } from "../config/constants";
import { auth } from "./auth";
import { user } from "./chps-compund";
import { inquiry } from "./inquiry";
import { patient } from "./patient";
import { prescription } from "./prescription";

const router = express.Router();

router.use(URLS.auth.root, auth);
router.use(URLS.user.root, user);
router.use(URLS.patient.root, patient);
router.use(URLS.inquiry.root, inquiry);
router.use(URLS.prescription.root, prescription);

export const api = router;
