"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const express_1 = __importDefault(require("express"));
const constants_1 = require("../config/constants");
const auth_1 = require("./auth");
const admin_1 = require("./admin");
const chps_compund_1 = require("./chps-compund");
const staff_1 = require("./staff");
const inquiry_1 = require("./inquiry");
const patient_1 = require("./patient");
const auth_requests_1 = require("../middleware/auth-requests");
const test_upload_1 = require("./test-upload");
const router = express_1.default.Router();
router.use(constants_1.URLS.auth.root, auth_1.auth);
router.use(constants_1.URLS.admin.root, auth_requests_1.authorize, admin_1.admin);
router.use(constants_1.URLS.chps.root, auth_requests_1.authorize, chps_compund_1.chps);
router.use(constants_1.URLS.staff.root, auth_requests_1.authorize, staff_1.staff);
router.use(constants_1.URLS.patient.root, auth_requests_1.authorize, patient_1.patient);
router.use(constants_1.URLS.inquiry.root, auth_requests_1.authorize, inquiry_1.inquiry);
router.use("/upload", auth_requests_1.authorize, test_upload_1.uploadRouter); //TODO: DELETE THIS.IT WAS JUST FOR DEMO PURPOSES
exports.api = router;
