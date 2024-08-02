"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewUserNotification = exports.EmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_1 = require("../config/env");
const logger_1 = require("../utils/logger");
class EmailService {
    constructor() {
        this.sender = env_1.config.EMAIL_USER;
        this.transporter = nodemailer_1.default.createTransport({
            host: env_1.config.EMAIL_HOST,
            port: env_1.config.EMAIL_PORT,
            secure: env_1.config.EMAIL_PORT === 465 ? true : false,
            auth: {
                user: env_1.config.EMAIL_USER,
                pass: env_1.config.EMAIL_PASSWORD,
            },
        });
    }
    async sendEmail(values) {
        const { to, subject } = values;
        await this.transporter.sendMail({ ...values, from: this.sender });
        logger_1.logger.info({ action: "sendEmail", dst: to, subject });
    }
}
exports.EmailService = EmailService;
class NewUserNotification extends EmailService {
    constructor(user) {
        super();
        this.sendWelcomeMail = async () => await this.sendEmail(this.options);
        this.options = {
            subject: "Welcome to MedConnect",
            to: user.email,
            text: `Welcome ${user.name},
            Below are your login credentials. 
            Kindly reset your password in the next 3 days.
            
            email: ${user.email}
            password: ${user.password}
      `,
        };
    }
}
exports.NewUserNotification = NewUserNotification;
