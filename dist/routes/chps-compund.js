"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chps = void 0;
const express_1 = __importDefault(require("express"));
const constants_1 = require("../config/constants");
const chps_compound_1 = require("../controllers/chps-compound");
const validators_1 = require("../middleware/validators");
const auth_requests_1 = require("../middleware/auth-requests");
const router = express_1.default.Router();
router
    .route(constants_1.URLS.chps.all)
    .all(auth_requests_1.authorizeAdmin)
    .post(validators_1.validateChpsCompoundData, chps_compound_1.createCompound)
    .get(chps_compound_1.getCompounds);
router
    .route(constants_1.URLS.chps.one)
    .get(chps_compound_1.getCompound)
    .put(validators_1.validateChpsUpdateData, chps_compound_1.updateCompound)
    .delete(auth_requests_1.authorizeAdmin, chps_compound_1.deleteCompound);
router
    .route(constants_1.URLS.chps.inventory.all)
    .get(chps_compound_1.getInventories)
    .post(validators_1.validateInventoryData, chps_compound_1.addInventory);
router
    .route(constants_1.URLS.chps.inventory.one)
    .get(chps_compound_1.getInventory)
    .patch(validators_1.validateInventoryData, chps_compound_1.updateInventory)
    .delete(chps_compound_1.deleteInventory);
router.post(constants_1.URLS.chps.outreachParticipation.all, validators_1.validateOutreachParticipationData, chps_compound_1.addOutreachParticipation);
router.patch(constants_1.URLS.chps.outreachParticipation.one, validators_1.validateOutreachParticipationData, chps_compound_1.updateOutreachParticipation);
//tickets
router
    .route(constants_1.URLS.chps.ticket.all)
    .get(chps_compound_1.getTickets)
    .post(validators_1.validateAddTicketData, chps_compound_1.addTicket);
router.get(constants_1.URLS.chps.ticket.one, chps_compound_1.getTicket);
exports.chps = router;
