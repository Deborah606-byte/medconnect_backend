"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rlogger = exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const constants_1 = require("../config/constants");
const { timestamp, printf, combine } = winston_1.default.format;
const formatter = (log) => `${log.timestamp} - ${log.level.toUpperCase()} - ${JSON.stringify(log.message)}`;
exports.logger = winston_1.default.createLogger({
    level: "info",
    format: combine(timestamp({ format: "YYYY-MM-DD hh:mm:ss.SSS" }), printf(formatter)),
    transports: [
        new winston_1.default.transports.Console(),
        new winston_1.default.transports.File({ filename: constants_1.APP_LOG }),
    ],
});
const requestLogger = winston_1.default.createLogger({
    level: "info",
    format: combine(timestamp({ format: "YYYY-MM-DD hh:mm:ss.SSS" }), printf(formatter)),
    transports: [
        new winston_1.default.transports.Console(),
        new winston_1.default.transports.File({ filename: constants_1.REQUEST_LOG }),
    ],
});
const rlogger = (req, res, next) => {
    const { ip: source, method, originalUrl: url } = req;
    requestLogger.info({ source, method, url });
    next();
};
exports.rlogger = rlogger;
