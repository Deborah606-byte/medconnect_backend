const express = require('express');
const router = express.Router();
const { getAllPrescriptions, getPrescriptionById, createPrescription, updatePrescription, deletePrescription } = require('../controllers/prescriptionController');

router.get('/', getAllPrescriptions);
router.get('/:id', getPrescriptionById);
router.post('/', createPrescription);
router.put('/:id', updatePrescription);
router.delete('/:id', deletePrescription);

module.exports = router;
