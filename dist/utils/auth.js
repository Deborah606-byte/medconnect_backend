"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUtil = void 0;
const crypto_1 = __importDefault(require("crypto"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
class AuthUtility {
    constructor(secret) {
        this.tokenBlacklist = new Set();
        this.bcryptRounds = 10;
        this.jwtSecret = secret;
        this.startExpiredTokensCleanup();
    }
    isTokenBlacklisted(token) {
        return this.tokenBlacklist.has(token);
    }
    decodeToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, this.jwtSecret);
        }
        catch (error) {
            return null;
        }
    }
    startExpiredTokensCleanup() {
        setInterval(() => {
            for (const token of this.tokenBlacklist) {
                const { iat } = this.decodeToken(token);
                if (Date.now() > iat)
                    this.tokenBlacklist.delete(token);
            }
        }, 15 * 60 * 1000);
    }
    async generateHashedPassword(password) {
        const salt = await bcrypt_1.default.genSalt(this.bcryptRounds);
        return await bcrypt_1.default.hash(password, salt);
    }
    async isPasswordValid(password, hashedPassword) {
        return await bcrypt_1.default.compare(password, hashedPassword);
    }
    generateToken(data) {
        return jsonwebtoken_1.default.sign(data, this.jwtSecret, { expiresIn: "1h" });
    }
    addTokenToBlacklist(token) {
        this.tokenBlacklist.add(token);
    }
    verifyToken(token) {
        if (this.isTokenBlacklisted(token))
            return { valid: false };
        const data = this.decodeToken(token);
        return { valid: !!data, data };
    }
    generatetempPassword() {
        return crypto_1.default
            .randomBytes(this.bcryptRounds)
            .toString("base64")
            .slice(0, this.bcryptRounds)
            .replace(/\+/g, "0")
            .replace(/\//g, "0");
    }
}
exports.authUtil = new AuthUtility(env_1.config.JWT_SECRET);
