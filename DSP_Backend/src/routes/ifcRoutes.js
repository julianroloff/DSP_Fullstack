import express from "express"
import multer from "multer"
import { handleIfcUpload } from "../controllers/ifcToRdfController.js"
import { compareUValues } from "../services/compareUValues.js"
import path from 'path';
import fs from 'fs';


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

router.get("/upload-summary", async (req, res) => {
    const directory = path.resolve("src/data/summaries");
    const csvPath = path.join(directory, "summary.csv");

    if (!fs.existsSync(csvPath)) {
        console.error("File not found:", csvPath);
        return res.status(404).send("File not found.");
    }

    console.log("Sending file:", csvPath);

    // Log headers before sending
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename="summary.csv"`);
    console.log("Response headers before sending:", res.getHeaders());

    // Send the file
    res.status(200).sendFile(csvPath, (err) => {
        if (err) {
            console.error("Error sending file:", err);
            res.status(500).send("Error sending the file.");
        } else {
            console.log("File sent successfully.");
        }
    });
});


export default router;
