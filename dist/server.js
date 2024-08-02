"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
const env_1 = require("./config/env");
const db_1 = require("./config/db");
const constants_1 = require("./config/constants");
const index_1 = require("./routes/index");
const logger_1 = require("./utils/logger");
const error_handler_1 = require("./middleware/error-handler");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)(constants_1.CORS_OPTIONS));
app.use((0, cookie_parser_1.default)());
app.use((0, helmet_1.default)());
app.use(logger_1.rlogger);
app.use(constants_1.URLS.root, index_1.api);
app.use(error_handler_1.globalErrorHandler);
(0, db_1.dbConnect)().then((status) => {
    if (!status)
        return process.exit(1);
    app.listen(env_1.config.PORT, () => console.log(`server up on port: ${env_1.config.PORT}`));
});
