"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutreachParticipation = exports.ChpsCompound = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = require("../../config/constants");
const requiredString = {
    type: String,
    required: true,
};
const chpsCompound = new mongoose_1.default.Schema({
    name: {
        unique: true,
        ...requiredString,
    },
    contact: requiredString,
    emergencyContact: requiredString,
    location: requiredString,
    region: requiredString,
    district: requiredString,
    operatingHours: requiredString,
    availableServices: {
        type: [String],
        default: [],
    },
    hasAcceptedTC: {
        type: Boolean,
        required: true,
    },
    profilePictureUrl: {
        type: String,
        default: "",
    },
    authUserId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdById: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
    },
});
chpsCompound.methods.getInitials = function () {
    const words = this.name.split(" ");
    let initials = "";
    if (words.length === 1) {
        const word = words[0];
        initials = word.charAt(0) + word.charAt(word.length - 1);
    }
    else {
        initials = words[0].charAt(0) + words[1].charAt(0);
    }
    return initials.toUpperCase();
};
const outreachParticipation = new mongoose_1.default.Schema({
    outreachProgramId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "OutreachProgram",
        required: true,
    },
    chpsCompoundId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "ChpsCompound",
        required: true,
    },
    choice: { type: String, enum: constants_1.OUTREACH_ACTIONS, required: true },
    supportType: { type: String, required: false },
    status: { type: Boolean, required: true },
}, { timestamps: true });
exports.ChpsCompound = mongoose_1.default.model("ChpsCompound", chpsCompound);
exports.OutreachParticipation = mongoose_1.default.model("OutreachParticipation", outreachParticipation);
