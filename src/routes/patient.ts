import express from "express";
import { URLS } from "../config/constants";
import { authorizeAdmin } from "../middleware/auth-requests";
import {
  validatePatientData,
  validatePresciptionData,
  validatePatientResourceParams,
} from "../middleware/validators";
import {
  addPatient,
  getAllPatients,
  getChpsPatients,
  getChpsPatient,
  editChpsPatient,
  removeChpsPatient,
  //prescriptions
  getPresciptions,
  getPresciption,
  addPrescription,
  editPrescription,
  removePrescription,
} from "../controllers/patient";

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

// prescription
router
  .route(URLS.patient.chps.prescription.all)
  .get(getPresciptions)
  .post(validatePresciptionData, addPrescription);

router
  .route(URLS.patient.chps.prescription.one)
  .all(validatePatientResourceParams)
  .get(getPresciption)
  .patch(validatePresciptionData, editPrescription)
  .delete(removePrescription);

export const patient = router;
