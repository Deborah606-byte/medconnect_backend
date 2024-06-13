// const User = require("../models/User");
// const ResetToken = require("../models/ResetToken");
// const { sendEmail } = require("../utils/sendEmailService");
// const { comparePassword, generateToken, hashPassword } = require("../utils");

// // Login
// // exports.login = async (req, res) => {
// //   if (!req.body.compoundName || !req.body.password) {
// //     return res.status(400).json({
// //       message: "Compound name and password are required.",
// //       success: false,
// //     });
// //   }

// //   try {
// //     const user = await User.findOne({ compoundName: req.body.compoundName });
// //     if (!user) {
// //       return res.status(401).json({
// //         message: "Invalid compound name or password.",
// //         success: false,
// //       });
// //     }

// //     // Check if password is correct
// //     const validPassword = await comparePassword(
// //       req.body.password,
// //       user.password
// //     );

// //     if (!validPassword) {
// //       return res.status(401).json({
// //         message: "Invalid compound name or password.",
// //         success: false,
// //       });
// //     }

// //     // Generate JWT token
// //     const token = generateToken({ userId: user._id }, "1h");
// //     res.json({
// //       message: "Logged in successfully.",
// //       data: { token },
// //       success: true,
// //     });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message, success: false });
// //   }
// // };

// // Logout
// // exports.logout = (req, res) => {
// //   try {
// //     const { userId } = req.user;
// //     const newToken = generateToken({ userId }, "1s");

// //     // Set the new token in the cookie
// //     res.cookie("token", newToken, { maxAge: 1000, httpOnly: true });
// //     res
// //       .status(200)
// //       .json({ message: "You have been logged out", success: true });
// //   } catch (error) {
// //     res.status(500).json({ message: err.message, success: false });
// //   }
// // };

// // Forgot Password
// // exports.forgotPassword = async (req, res) => {
// //   const { email } = req.body;

// //   if (!email) {
// //     return res.status(400).json({
// //       message: "Email is required.",
// //       success: false,
// //     });
// //   }

// //   try {
// //     const user = await User.findOne({ email });
// //     if (!user) {
// //       return res.status(404).json({
// //         message: "No account with that email address exists.",
// //         success: false,
// //       });
// //     }

// //     // Generate a reset token
// //     const token = crypto.randomUUID();
// //     const resetToken = new ResetToken({
// //       user: user._id,
// //       token,
// //     });

// //     await resetToken.save();

// //     // email content
// //     const emailSubject = "Password Reset Request";
// //     const emailText = `You are receiving this because you (or someone else) has requested the reset of the password for your account.\n\n
// //                        Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n
// //                        http://localhost:8000/reset/${token}\n\n
// //                        If you did not request this, please ignore this email and your password will remain unchanged.`;

// //     // Send the email
// //     await sendEmail(email, emailSubject, emailText);

// //     res.status(200).json({
// //       message:
// //         "An email has been sent to " +
// //         email +
// //         ". If an account with that address exists, instructions will be sent to it.",
// //       success: true,
// //     });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({
// //       message: "There was an error processing your request.",
// //       success: false,
// //     });
// //   }
// // };

// // Reset Password
// // exports.resetPassword = async (req, res) => {
// //   const { token, password, email } = req.body;

// //   if (!token || !password || !email) {
// //     return res.status(400).json({
// //       message: "Token, new password and email are required.",
// //       success: false,
// //     });
// //   }

// //   try {
// //     const user = await User.findOne({ email });
// //     if (!user) {
// //       return res.status(404).json({
// //         message: "No account with that email address exists.",
// //         success: false,
// //       });
// //     }

// //     const resetToken = await ResetToken.findOne({ user: user._id, token });
// //     if (!resetToken) {
// //       return res.status(404).json({
// //         message: "No account with that email address exists.",
// //         success: false,
// //       });
// //     }

// //     const hashedPassword = await hashPassword(password);
// //     user.password = hashedPassword;
// //     await user.save();

// //     await ResetToken.deleteOne({ _id: resetToken._id });

// //     res.status(200).json({
// //       message: "Password has been changed successfully.",
// //       success: true,
// //     });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({
// //       message: "There was an error processing your request.",
// //       success: false,
// //     });
// //   }
// // };
