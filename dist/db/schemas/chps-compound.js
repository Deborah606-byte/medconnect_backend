"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTicketSchema = exports.updateChpsCompoundSchema = exports.chpsCompoundSchema = void 0;
const zod_1 = require("zod");
exports.chpsCompoundSchema = zod_1.z
    .object({
    name: zod_1.z.string().min(6),
    contact: zod_1.z.string().min(9),
    emergencyContact: zod_1.z.string().min(9),
    location: zod_1.z.string(),
    district: zod_1.z.string(),
    region: zod_1.z.string(),
    operatingHours: zod_1.z.string(),
    availableServices: zod_1.z.array(zod_1.z.string()).default([]),
    hasAcceptedTC: zod_1.z.boolean(),
    profilePictureUrl: zod_1.z.string().url(),
    authUserId: zod_1.z.string(),
    createdById: zod_1.z.string(),
})
    .strict();
exports.updateChpsCompoundSchema = zod_1.z
    .object({
    name: zod_1.z.string().min(6),
    contact: zod_1.z.string().min(9),
    emergencyContact: zod_1.z.string().min(9),
    location: zod_1.z.string(),
    district: zod_1.z.string(),
    region: zod_1.z.string(),
    operatingHours: zod_1.z.string(),
    availableServices: zod_1.z.array(zod_1.z.string()).default([]),
    hasAcceptedTC: zod_1.z.boolean(),
    profilePictureUrl: zod_1.z.string().url(),
})
    .strict();
exports.addTicketSchema = zod_1.z
    .object({
    subject: zod_1.z.string(),
    description: zod_1.z.string(),
    imageUrl: zod_1.z.string().url().optional().default(""),
})
    .strict();
