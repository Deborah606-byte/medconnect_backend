const express = require("express");
const router = express.Router();
const { submitInquiry } = require("../controllers/inquiryController");

router.post("/submit-inquiry", submitInquiry);

module.exports = router;
