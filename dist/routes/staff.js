"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.staff = void 0;
const express_1 = __importDefault(require("express"));
const constants_1 = require("../config/constants");
const staff_1 = require("../controllers/staff");
const validators_1 = require("../middleware/validators");
const auth_requests_1 = require("../middleware/auth-requests");
const router = express_1.default.Router();
router
    .route(constants_1.URLS.staff.all)
    .all(auth_requests_1.authorizeAdmin)
    // .get(getAllStaff)
    .post(validators_1.validateStaffData, staff_1.addStaff);
router.get(constants_1.URLS.staff.chps.all, staff_1.getAllStaff);
router
    .route(constants_1.URLS.staff.chps.one)
    .get(staff_1.getStaff)
    .delete(staff_1.deleteStaff)
    .put(validators_1.validateUpdateStaffData, staff_1.updateStaff);
router.patch(constants_1.URLS.staff.role, auth_requests_1.authorizeAdmin, validators_1.validateRoleData, staff_1.editRole);
exports.staff = router;
