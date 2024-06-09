// routes/patientRoutes.js
const express = require("express");
const {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
} = require("../controllers/patientController");
const { authenticateUser } = require("../middleware/authenticateUser");

const router = express.Router();

// authentication middleware
router.use(authenticateUser);

router.get("/all", getAllPatients);
router.get("/:id", getPatientById);
router.post("/", createPatient);
router.put("/:id", updatePatient);
router.delete("/:id", deletePatient);

module.exports = router;
