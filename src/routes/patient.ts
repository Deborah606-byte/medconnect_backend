import express from "express";
import { URLS } from "../config/constants";
import { authorizeAdmin } from "../middleware/auth-requests";
import {
  validatePatientData,
  validatePresciptionData,
  validatePatientResourceParams,
  validateTreatmentPlanData,
} from "../middleware/validators";
import {
  addPatient,
  getAllPatients,
  getChpsPatients,
  getChpsPatient,
  editChpsPatient,
  removeChpsPatient,
  prescription,
  treatmentPlan,
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
  .route(URLS.patient.prescription.all)
  .get(prescription.getResources)
  .post(validatePresciptionData, prescription.addResource);

router
  .route(URLS.patient.prescription.one)
  .all(validatePatientResourceParams)
  .get(prescription.getResource)
  .patch(validatePresciptionData, prescription.editResource)
  .delete(prescription.removeResource);

// treatment-plans
router
  .route(URLS.patient.treatmentPlan.all)
  .get(treatmentPlan.getResources)
  .post(validateTreatmentPlanData, treatmentPlan.addResource);
router
  .route(URLS.patient.treatmentPlan.one)
  .all(validatePatientResourceParams)
  .get(treatmentPlan.getResource)
  .patch(validateTreatmentPlanData, treatmentPlan.editResource)
  .delete(treatmentPlan.removeResource);

export const patient = router;
