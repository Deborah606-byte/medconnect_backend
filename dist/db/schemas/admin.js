"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTicketSchema = exports.outreachParticipationSchema = exports.outreachProgramSchema = exports.updateAmdinSchema = exports.createAdminSchema = exports.adminSchema = void 0;
const zod_1 = require("zod");
const constants_1 = require("../../config/constants");
exports.adminSchema = zod_1.z
    .object({
    name: zod_1.z.string().min(5),
    contact: zod_1.z.string().min(9),
    authUserId: zod_1.z.string(),
    profilePictureUrl: zod_1.z.string().url(),
})
    .strict();
exports.createAdminSchema = zod_1.z
    .object({
    name: zod_1.z.string().min(5),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
    contact: zod_1.z.string().min(9),
    profilePictureUrl: zod_1.z.string().url(),
})
    .strict();
exports.updateAmdinSchema = zod_1.z
    .object({
    contact: zod_1.z.string().min(9),
    profilePictureUrl: zod_1.z.string().url(),
})
    .strict();
exports.outreachProgramSchema = zod_1.z
    .object({
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    organizerName: zod_1.z.string(),
    organizerPhone: zod_1.z.string(),
    organization: zod_1.z.string(),
    location: zod_1.z.string(),
    targetGroup: zod_1.z.string(),
    estimatedAudience: zod_1.z.number(),
    programDate: zod_1.z.string(),
    programStartTime: zod_1.z.string(),
})
    .strict();
exports.outreachParticipationSchema = zod_1.z
    .object({
    outreachProgramId: zod_1.z.string(),
    choice: zod_1.z.enum(constants_1.OUTREACH_ACTIONS),
    supportType: zod_1.z.string().optional(),
    status: zod_1.z.boolean(),
})
    .strict();
exports.updateTicketSchema = zod_1.z
    .object({
    status: zod_1.z.enum(constants_1.TICKET_STATUSES),
    priority: zod_1.z.enum(constants_1.TICKET_PRIORITY),
})
    .strict();
