"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordDataSchema = exports.forgotPasswordData = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z
    .object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
    isSuperAdmin: zod_1.z.boolean().default(false),
})
    .strict();
exports.forgotPasswordData = zod_1.z
    .object({
    email: zod_1.z.string().email(),
})
    .strict();
exports.resetPasswordDataSchema = zod_1.z
    .object({
    email: zod_1.z.string().email(),
    token: zod_1.z.string(),
    password: zod_1.z.string().min(8),
})
    .strict();
