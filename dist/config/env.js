"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFEUrl = exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
const constants_1 = require("./constants");
const EnvSchema = zod_1.z.object({
    PORT: zod_1.z.coerce.number(),
    ATLAS_URI: zod_1.z.string(),
    JWT_SECRET: zod_1.z.string(),
    EMAIL_HOST: zod_1.z.string(),
    EMAIL_PORT: zod_1.z.coerce.number(),
    EMAIL_USER: zod_1.z.string().email(),
    EMAIL_PASSWORD: zod_1.z.string(),
    NODE_ENV: zod_1.z.enum(["development", "production"]),
});
dotenv_1.default.config();
try {
    EnvSchema.parse(process.env);
}
catch (err) {
    process.exit(1);
}
exports.config = EnvSchema.parse(process.env);
const getFEUrl = () => exports.config.NODE_ENV === "development" ? constants_1.FE_URLS.DEV : constants_1.FE_URLS.VERCEL;
exports.getFEUrl = getFEUrl;
