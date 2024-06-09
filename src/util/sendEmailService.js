// emailService.js
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const secretKey = 'MedConnect@rualinstitution';
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.app_email,
    pass: process.env.app_password,
  },
});

async function sendEmail(email, subject, text) {
  const mailOptions = {
    from: '"Your Website" <no-reply@yourwebsite.com>',
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
