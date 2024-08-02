"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.staffSchema = exports.roleSchema = void 0;
const zod_1 = require("zod");
const constants_1 = require("../../config/constants");
exports.roleSchema = zod_1.z.object({
    type: zod_1.z.enum(constants_1.STAFF_ROLES),
    staffId: zod_1.z.string(),
});
exports.staffSchema = zod_1.z
    .object({
    fullName: zod_1.z.string(),
    dateOfBirth: zod_1.z.string(),
    dateOfHire: zod_1.z.string(),
    position: zod_1.z.string(),
    email: zod_1.z.string().email(),
    contact: zod_1.z.string().min(8),
    gender: zod_1.z.enum(["Male", "Female", "Other"]),
    workSchedule: zod_1.z.array(zod_1.z.string()),
    chpsCompoundId: zod_1.z.string(),
})
    .strict();
