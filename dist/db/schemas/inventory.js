"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventorySchema = void 0;
const zod_1 = require("zod");
exports.inventorySchema = zod_1.z
    .object({
    name: zod_1.z.string(),
    type: zod_1.z.string(),
    inStock: zod_1.z.number(),
    receivedDate: zod_1.z.string(),
    expiryDate: zod_1.z.string(),
    manufacturer: zod_1.z.string(),
})
    .strict();
