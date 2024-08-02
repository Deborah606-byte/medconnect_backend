"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadRouter = void 0;
const express_1 = __importDefault(require("express"));
const upload_1 = require("../middleware/upload");
const catch_async_1 = require("../utils/catch-async");
// const { submitInquiry } = require("../controllers/inquiry");
const router = express_1.default.Router();
router.post("/", upload_1.upload.single("image"), (0, upload_1.uploadToS3Express)(), (0, catch_async_1.catchAsync)(async (req, res) => {
    try {
        if (!req?.fileUrl) {
            res.json({ fileUrl: "NOT FOUND" });
        }
        else
            res.json({ fileUrl: req?.fileUrl });
    }
    catch (error) {
        res.json({ message: "NOTFOUND" });
    }
}));
exports.uploadRouter = router;
