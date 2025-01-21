import express from "express";
import multer from "multer";
import { handleIfcSummary } from "../controllers/summaryController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Temporary storage for uploaded files

router.post("/upload-summary", upload.single("file"), handleIfcSummary);

export default router;