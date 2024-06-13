import express from "express";
import { URLS } from "../data/constants";
// const { submitInquiry } = require("../controllers/inquiry");

const router = express.Router();
// router.post(URLS.inquiry.submit, submitInquiry);

export const inquiry = router;
