const express = require("express");
const userRoutes = require("../routes/userRoute");
const authRoutes = require("../routes/authRoute");
const inquiryRoutes = require("../routes/inquiryRoutes");
const patientRoutes = require("../routes/patientRoutes");
const prescriptionRoutes = require("../routes/prescriptionRoutes");


const router = express.Router();


app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/prescriptions", prescriptionRoutes);

module.exports.api = router