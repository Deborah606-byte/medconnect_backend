"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./env");
const dbConnect = async function () {
    try {
        await mongoose_1.default.connect(env_1.config.ATLAS_URI);
        return true;
    }
    catch (err) {
        console.log({ DB_CONN_ERR: err });
        return false;
    }
};
exports.dbConnect = dbConnect;
