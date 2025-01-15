import express from "express"
import multer from "multer"
import { handleIfcUpload } from "../controllers/ifcToRdfController.js"

const router = express.Router();
const upload = multer({ dest: "uploads/"}); //Stores files in the upload folder

router.post("/ifc-to-rdf", upload.single("ifcFile"), handleIfcUpload);

export default router;
