// emailService.js
const nodemailer = require("nodemailer");
const envConfig = require("./envConfig");

const transporter = nodemailer.createTransport({
  host: envConfig.app_host_name,
  port: envConfig.app_port,
  secure: envConfig.app_port === 465 ? true : false,
  auth: {
    user: envConfig.app_email,
    pass: envConfig.app_password,
  },
});

async function sendEmail(
  email,
  subject,
  text,
  fromEmail = '"Your Website" <no-reply@yourwebsite.com>'
) {
  const mailOptions = {
    from: fromEmail,
    to: email,
    subject: subject,
    text: text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error(`Failed to send email to ${email}: `, error);
  }
}

module.exports = { sendEmail };
