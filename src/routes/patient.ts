import express from "express";
import { URLS } from "../config/constants";
import { validatePatientData } from "../middleware/validators";
import { addPatient, getAllPatients } from "../controllers/patient";
import { authorizeAdmin } from "../middleware/auth-requests";

const router = express.Router();

router
  .route(URLS.patient.all)
  .all(authorizeAdmin)
  .post(validatePatientData, addPatient)
  .get(getAllPatients);

export const patient = router;
