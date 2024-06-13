const Inquiry = require("../models/Inquiry");
const envConfig = require("../utils/envConfig");
const { sendEmail } = require("../utils/sendEmailService");

// Submit Inquiry Types
const inquiryTypes = [
  "Medical Assistance",
  "Partner with MedConnect",
  "Contact Us",
  "Fund MedConnect",
  "Other",
];

// Submit Inquiry
exports.submitInquiry = async (req, res) => {
  try {
    const { name, email, company, inquiryType, message } = req.body;

    if (!name || !email || !inquiryType || !message) {
      return res
        .status(400)
        .json({ message: "All fields are required.", success: false });
    }

    // Validate inquiryType against the enum values
    if (!inquiryTypes.includes(inquiryType)) {
      return res
        .status(400)
        .json({ message: "Invalid inquiry type.", success: false });
    }

    const newInquiry = new Inquiry({
      name,
      email,
      company,
      inquiryType,
      message,
    });

    await newInquiry.save();

    // Prepare the email content
    const companyName = company || "Unknown Company"; // Fallback in case company is not provided
    const inquiryDetails = `New inquiry received from ${name} (${email})\nInquiry Type: ${inquiryType}\nMessage: ${message}`;
    const subject = `New Inquiry from ${companyName}`;

    // Send the email notification to the company
    await sendEmail(envConfig.app_email, subject, inquiryDetails, email);

    res.status(201).json({
      message:
        "Inquiry submitted successfully. A notification has been sent to the company.",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "There was an error submitting your inquiry.",
      success: false,
    });
  }
};
