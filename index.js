require("dotenv").config();

// Import packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const morgan = require("morgan");

// Import routes
const userRoutes = require("./routes/userRoute");
const authRoutes = require("./routes/authRoute");
const inquiryRoutes = require("./routes/inquiryRoutes");
const patientRoutes = require("./routes/patientRoutes");
const prescriptionRoutes = require("./routes/prescriptionRoutes");

// other imports
const envConfig = require("./utils/envConfig");

// set up app
const app = express();

// apply default middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", envConfig.deployed_frontend_url], // frontend url
    credentials: true,
  })
);
app.use(cookieParser());
app.use(helmet());
app.use(morgan("common"));

// api routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/prescriptions", prescriptionRoutes);

// connect to mongodb and start server
mongoose
  .connect(envConfig.mongodb_url)
  .then(() => {
    console.log("DB connection established");
    app.listen(envConfig.port, () => {
      console.log(`Server started on port ${envConfig.port}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
