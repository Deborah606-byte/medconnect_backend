import express from "express";
import { URLS } from "../config/constants";
import { upload, uploadToS3Express } from "../services/upload";
// const { submitInquiry } = require("../controllers/inquiry");

const router = express.Router();
// router.post(URLS.inquiry.submit, submitInquiry);
// router.post(
//     "/upload",
//     upload.single("image"),
//     uploadToS3Express(),
//     (req, res) => {
//       try {
//         if (!req?.fileUrl) {
//           res.json({ fileUrl: "NOT FOUND" });
//         } else res.json({ fileUrl: req?.fileUrl });
//       } catch (error) {
//         res.json({ message: "NOTFOUND" });
//       }
//     }
//   );
export const inquiry = router;
