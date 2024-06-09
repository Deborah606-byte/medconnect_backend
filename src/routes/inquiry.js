const express = require("express");
const { URLS } = require("../data/constants");
const { submitInquiry } = require("../controllers/inquiry");

const router = express.Router();
router.post(URLS.inquiry.submit, submitInquiry);

module.exports.inquiry = router;
