import express from "express";
import { URLS } from "../config/constants";
import { validatePatientData } from "../middleware/validators";
import {
  addPatient,
  getAllPatients,
  getChpsPatients,
  getChpsPatient,
  editChpsPatient,
  removeChpsPatient,
} from "../controllers/patient";
import { authorizeAdmin } from "../middleware/auth-requests";

const router = express.Router();

router.route(URLS.patient.all).all(authorizeAdmin).get(getAllPatients);
router
  .route(URLS.patient.chps.all)
  .get(getChpsPatients)
  .post(validatePatientData, addPatient);
router
  .route(URLS.patient.chps.one)
  .get(getChpsPatient)
  .delete(removeChpsPatient)
  .patch(validatePatientData, editChpsPatient);

export const patient = router;
