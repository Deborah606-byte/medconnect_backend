"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = void 0;
const express_1 = __importDefault(require("express"));
const constants_1 = require("../config/constants");
const auth_requests_1 = require("../middleware/auth-requests");
const validators_1 = require("../middleware/validators");
const admin_1 = require("../controllers/admin");
const router = express_1.default.Router();
router.get(constants_1.URLS.admin.me, admin_1.fetchCurrentAdmin);
router
    .route(constants_1.URLS.admin.all)
    .all(auth_requests_1.authorizeAdmin)
    .get(admin_1.fetchAdmins)
    .post(validators_1.validateAdminData, admin_1.addAdmin);
router
    .route(constants_1.URLS.admin.one)
    .all(auth_requests_1.authorizeAdmin)
    .get(admin_1.fetchAdmin)
    .put(validators_1.validateUpdateAdminData, admin_1.editAdmin)
    .delete(admin_1.removeAdmin);
router
    .route(constants_1.URLS.admin.outreach.all)
    .all(auth_requests_1.authorizeAdmin)
    .get(admin_1.getOutreachPrograms)
    .post(validators_1.validateOutreachProgramData, admin_1.addOutreachProgram);
router
    .route(constants_1.URLS.admin.outreach.one)
    .all(auth_requests_1.authorizeAdmin)
    .get(admin_1.getOutreachProgram)
    .delete(admin_1.removeOutreachProgram)
    .patch(validators_1.validateOutreachProgramData, admin_1.editOutreachProgram);
router.get(constants_1.URLS.admin.ticket.all, auth_requests_1.authorizeAdmin, admin_1.getTickets);
router.patch(constants_1.URLS.admin.ticket.one, auth_requests_1.authorizeAdmin, validators_1.validateUpdateTicketData, admin_1.editTicket);
exports.admin = router;
