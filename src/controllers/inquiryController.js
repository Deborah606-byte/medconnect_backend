const Inquiry = require("../models/Inquiry");
const { sendEmail } = require("../util/sendEmailService");

exports.submitInquiry = async (req, res) => {
  try {
    const { name, email, company, inquiryType, message } = req.body;

    // Validate inquiryType against the enum values
    if (
      ![
        "Medical Assistance",
        "Partner with MedConnect",
        "Contact Us",
        "Fund MedConnect",
        "Other (Please specify in message below)",
      ].includes(inquiryType)
    ) {
      return res.status(400).send("Invalid inquiry type.");
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
    await sendEmail(process.env.app_email, subject, inquiryDetails);

    res
      .status(201)
      .send(
        "Inquiry submitted successfully. A notification has been sent to the company."
      );
  } catch (error) {
    console.error(error);
    res.status(500).send("There was an error submitting your inquiry.");
  }
};
