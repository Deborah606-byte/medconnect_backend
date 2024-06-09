// routes/patientRoutes.js
const express = require("express");
const { URLS } = require("../data/constants");
const {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
} = require("../controllers/patient");

const router = express.Router();

router.get(URLS.patient.all, getAllPatients);
router.post(URLS.patient.all, createPatient);
router.get(URLS.patient.one, getPatientById);
router.put(URLS.patient.one, updatePatient);
router.delete(URLS.patient.one, deletePatient);

module.exports.patient = router;
