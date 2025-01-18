import express from "express"
import multer from "multer"
import { handleIfcUpload } from "../controllers/ifcToRdfController.js"
import { compareUValues } from "../services/compareUValues.js"


const router = express.Router();
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});
const upload = multer({ storage });

router.post("/ifc-to-rdf", upload.single("ifcFile"), handleIfcUpload);

router.get("/compare-rdf", async (req, res) => {
    try {
        const comparisonResults = await compareUValues(
            "src/stored_rdf_files/stored.ttl",
            "src/data/regulations.ttl"
        );

        // Transform the results to only include necessary data for CompareList
        const transformedResults = comparisonResults.map((result) => ({
            component: result.component,
            regulationsMet: result.stored_uValue <= result.regulation_uValue,
        }));

        res.status(200).json(transformedResults);
    } catch (error) {
        console.error("Error comparing RDF files:", error);
        res.status(500).json({ message: "Failed to compare RDF files", error: error.message });
    }
});


export default router;
