"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prescription = void 0;
const express_1 = __importDefault(require("express"));
// const {
//   getAllPrescriptions,
//   getPrescriptionById,
//   createPrescription,
//   updatePrescription,
//   deletePrescription,
// } = require("../controllers/prescription");
const router = express_1.default.Router();
// router.get(URLS.prescription.all, getAllPrescriptions);
// router.post(URLS.prescription.all, createPrescription);
// router.get(URLS.prescription.one, getPrescriptionById);
// router.put(URLS.prescription.one, updatePrescription);
// router.delete(URLS.prescription.one, deletePrescription);
exports.prescription = router;
