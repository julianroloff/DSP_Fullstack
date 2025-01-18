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
        console.log("Starting RDF comparison...");
        const comparisonResults = await compareUValues(
            "src/stored_rdf_files/stored.ttl",
            "src/data/regulations.ttl"
        );

        console.log("Raw comparison results:", comparisonResults);

        const transformedResults = comparisonResults.map((item) => ({
            component: item.component.split("/").pop(), // Extract component name
            regulationsMet: item.status === "compliant", // Convert status to boolean
        }));

        console.log("Transformed results:", transformedResults);
        res.status(200).json(transformedResults);
    } catch (error) {
        console.error("Error comparing RDF files:", error);
        res.status(500).json({ message: "Failed to compare RDF files", error: error.message });
    }
});




export default router;
