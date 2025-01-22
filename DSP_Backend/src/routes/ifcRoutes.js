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
            type: item.type,
            regulationsMet: item.status === "compliant", // Convert status to boolean
        }));

        console.log("Transformed results:", transformedResults);

        const filePath = path.resolve("src/data", "transformedResults.json");

        // Save the transformed results as a JSON file
        fs.writeFile(filePath, JSON.stringify(transformedResults, null, 2), (err) => {
            if (err) {
                console.error("Error saving transformed results:", err);
                return res.status(500).json({ message: "Failed to save transformed results" });
            }
            console.log("Transformed results saved successfully to:", filePath);
        });

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

router.get("/get-percentage", async (req, res) => {
    try {
        const directory = path.resolve("src/data");
        const jsonPath = path.join(directory, "transformedResults.json");

        // Überprüfen, ob die Datei existiert
        if (!fs.existsSync(jsonPath)) {
            console.error("File not found:", jsonPath);
            return res.status(404).send("File not found.");
        }

        // Dateiinhalt lesen
        const fileContent = fs.readFileSync(jsonPath, "utf-8");
        const transformedResults = JSON.parse(fileContent);

        // Anzahl der true-Werte und Gesamtelemente berechnen
        const totalCount = transformedResults.length;
        const compliantCount = transformedResults.filter(item => item.regulationsMet).length;

        // Prozentzahl berechnen
        const percentage = totalCount > 0 ? (100-(compliantCount / totalCount) * 100) : 0;

        console.log(`Compliance Percentage: ${percentage}%`);

        // Prozentzahl als JSON zurückgeben
        res.status(200).json({ percentage: percentage.toFixed(2) });
    } catch (error) {
        console.error("Error calculating percentage:", error);
        res.status(500).json({ message: "Failed to calculate percentage", error: error.message });
    }
});


export default router;
