"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToS3Express = exports.upload = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const multer_1 = __importDefault(require("multer"));
const crypto_1 = __importDefault(require("crypto"));
// Configure S3 client
const s3Client = new client_s3_1.S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
// Configure multer for handling file uploads
exports.upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
// Function to generate a unique filename
function generateUniqueFilename(originalname) {
    const hash = crypto_1.default.randomBytes(16).toString("hex");
    return `${hash}-${originalname}`;
}
// Middleware function
const uploadToS3Express = () => {
    const bucketName = process.env.BUCKET_NAME;
    return async (req, res, next) => {
        if (!req.file) {
            return res.status(400).send("No file uploaded");
        }
        const file = req.file;
        const key = generateUniqueFilename(file.originalname);
        try {
            const params = {
                Bucket: bucketName,
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype,
            };
            const command = new client_s3_1.PutObjectCommand(params);
            await s3Client.send(command);
            const cloudFrontUrl = `${process.env.CLOUDFRONT_URL}/${key}`;
            req.fileUrl = cloudFrontUrl;
            next();
        }
        catch (error) {
            console.error("Error uploading file: ", error);
            res.status(500).send("Error uploading file");
        }
    };
};
exports.uploadToS3Express = uploadToS3Express;
