"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMAIL = exports.URLS = exports.CORS_OPTIONS = exports.FE_URLS = exports.MARITAL_STATUSES = exports.OUTREACH_ACTIONS = exports.TICKET_PRIORITY = exports.TICKET_STATUSES = exports.GENDERS = exports.STAFF_ROLES = exports.STATUSES = exports.REQUEST_LOG = exports.APP_LOG = void 0;
const path_1 = __importDefault(require("path"));
const LOGS_DIR = path_1.default.join(__dirname, "..", "..", "logs");
exports.APP_LOG = path_1.default.join(LOGS_DIR, "app.log");
exports.REQUEST_LOG = path_1.default.join(LOGS_DIR, "request.log");
exports.STATUSES = { SUCCESS: true, FAILED: false };
exports.STAFF_ROLES = ["Admin", "Staff"];
exports.GENDERS = ["Male", "Female", "Other"];
exports.TICKET_STATUSES = ["OPEN", "CLOSED"];
exports.TICKET_PRIORITY = ["LOW", "MEDIUM", "HIGH"];
exports.OUTREACH_ACTIONS = ["Participate", "Volunteer"];
exports.MARITAL_STATUSES = [
    "Single",
    "Married",
    "Divorced",
    "Widowed",
];
exports.FE_URLS = {
    DEV: "http://localhost:3000",
    VERCEL: "https://medconnect-gh.vercel.app",
    RENDER: "https://medconnect-knb2.onrender.com",
};
exports.CORS_OPTIONS = {
    origin: Object.values(exports.FE_URLS),
    credentials: true,
};
exports.URLS = {
    root: "/api",
    chps: {
        root: "/chps-compound",
        all: "/",
        one: "/:id",
        inventory: { all: "/:id/inventories", one: "/:id/inventory/:vid" },
        outreachParticipation: {
            all: "/:id/outreach-participations",
            one: "/:id/outreach-participations/:pid",
        },
        ticket: { all: "/:id/tickets", one: "/:id/tickets/:tid" },
    },
    staff: {
        root: "/staff",
        all: "/",
        one: "/:id/all",
        role: "/role",
        chps: { all: "/:id", one: "/:id/:sid" },
    },
    patient: {
        root: "/patient",
        all: "/",
        chps: {
            all: "/chps/:id/",
            one: "/chps/:id/:pid",
        },
        prescription: {
            all: "/:pid/prescriptions/",
            one: "/:pid/prescriptions/:aid",
        },
        treatmentPlan: {
            all: "/:pid/treatment-plans",
            one: "/:pid/treatment-plans/:aid",
        },
        diagnosisReport: {
            all: "/:pid/diagnosis-reports",
            one: "/:pid/diagnosis-reports/:aid",
        },
        visitLog: { all: "/:pid/visit-logs", one: "/:pid/visit-logs/:aid" },
        appointment: { all: "/:pid/appointments", one: "/:pid/appointments/:aid" },
        medicalHistory: {
            all: "/:pid/medical-history",
            one: "/:pid/medical-history/:aid",
        },
    },
    inquiry: { root: "inquiries", submit: "/submit-inquiry" },
    auth: {
        root: "/auth",
        login: "/login",
        logout: "/logout",
        resetPassword: "/reset-password",
        forgotPassword: "/forgot-password",
        switch: "/switch-staff/:id",
    },
    admin: {
        root: "/admin",
        all: "/",
        one: "/:id",
        me: "/me",
        ticket: { all: "/:id/tickets", one: "/:id/tickets/:tid" },
        outreach: {
            all: "/:id/outreach-programs",
            one: "/:id/outreach-programs/:pid",
        },
    },
};
exports.EMAIL = {
    reset: {
        subject: "Password Reset Request",
        getText: function (token, feUrl) {
            return `You are receiving this because you (or someone else) has requested the reset of the password for your account.\n\n
                       Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n
                       ${feUrl}/reset-password?token=${token}\n\n
                       If you did not request this, please ignore this email and your password will remain unchanged.`;
        },
    },
};
