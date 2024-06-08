const User = require("../models/User");
const ResetToken = require("../models/ResetToken");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const secretKey = "MedConnect@rualinstitution";
require("dotenv").config();

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ compoundName: req.body.compoundName });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid compound name or password." });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res
        .status(401)
        .json({ message: "Invalid compound name or password." });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "1h",
    });

    res.json({ message: "Logged in successfully.", token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.logout = (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);

    const newToken = jwt.sign({}, secretKey, { expiresIn: "1s" });

    res.cookie("token", newToken, { maxAge: 1000, httpOnly: true });
    res.send({ msg: "You have been logged out" });
  });
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("No account with that email address exists.");
    }

    const token = crypto.randomBytes(20).toString("hex");
    const resetToken = new ResetToken({
      user: user._id,
      token,
    });

    await resetToken.save();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.app_email,
        pass: process.env.app_password,
      },
    });

    const mailOptions = {
      from: '"Your Website" <no-reply@yourwebsite.com>',
      to: email,
      subject: "Password Reset Request",
      text: `You are receiving this because you (or someone else) has requested the reset of the password for your account.\n\n
               Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n
               http://localhost:8000/reset/${token}\n\n
               If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(mailOptions);

    res.send(
      "An email has been sent to " +
        email +
        ". If an account with that address exists, instructions will be sent to it."
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("There was an error processing your request.");
  }
};

exports.resetPassword = async (req, res) => {
  const { token, newPassword, email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("No account with that email address exists.");
    }

    const resetToken = await ResetToken.findOne({ user: user._id, token });
    if (!resetToken) {
      return res.status(404).send("No account with that email address exists.");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    await ResetToken.deleteOne({ _id: resetToken._id });

    res.send("Password has been changed successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("There was an error processing your request.");
  }
};
