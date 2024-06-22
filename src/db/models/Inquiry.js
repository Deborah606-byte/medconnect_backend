// models/inquiry.js
const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    company: String,
    inquiryType: {
      type: String,
      enum: [
        "Medical Assistance",
        "Partner with MedConnect",
        "Contact Us",
        "Fund MedConnect",
        "Other (Please specify in message below)",
      ],
      required: true,
    },
    message: String,
  },
  {
    timestamps: true,
  }
);

const Inquiry = mongoose.model("Inquiry", inquirySchema);

module.exports = Inquiry;
