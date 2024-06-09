const express = require("express");
const { submitInquiry } = require("../controllers/inquiryController");

const router = express.Router();

router.post("/submit-inquiry", submitInquiry);

module.exports = router;
