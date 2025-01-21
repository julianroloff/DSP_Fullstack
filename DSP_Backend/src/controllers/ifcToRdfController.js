import { exec } from "child_process";
import path from "path";
import fs from "fs";
import { generateSummary } from "./summaryController.js";

export const handleIfcUpload = (req, res) => {
    try {
        const ifcFilePath = path.resolve(req.file.path);
        const outputDirectory = path.resolve("src/stored_rdf_files");
        const rdfFilePath = path.join(outputDirectory, "stored.ttl");

        // Ensure the output directory exists
        if (!fs.existsSync(outputDirectory)) {
            fs.mkdirSync(outputDirectory, { recursive: true });
        }

        if (!fs.existsSync(ifcFilePath)) {
            console.error(`Uploaded file not found: ${ifcFilePath}`);
            return res.status(400).json({ message: "Uploaded file not found" });
        }

        const pythonInterpreter = "/Users/jeremypalmerio/opt/miniconda3/envs/DSP/bin/python"; // Adjust this path if needed
        const conversionCommand = `${pythonInterpreter} src/utils/ifc_to_rdf.py "${ifcFilePath}" "${rdfFilePath}"`;

        exec(conversionCommand, (error, stdout, stderr) => {
            console.log("Conversion command executed:", conversionCommand);
            console.log("stdout:", stdout);
            console.log("stderr:", stderr);

            if (error) {
                console.error("Error executing conversion script:", error);
                return res.status(500).json({
                    message: "Failed to process IFC file",
                    error: stderr || error.message,
                });
            }

            // Invoke the summary generation controller
            generateSummary(rdfFilePath, res);

            // Clean up the temporary uploaded IFC file
            fs.unlink(ifcFilePath, (unlinkError) => {
                if (unlinkError) {
                    console.error("Error cleaning up uploaded file:", unlinkError);
                }
            });
        });
    } catch (error) {
        console.error("Error during IFC-to-RDF conversion:", error);
        res.status(500).json({ message: "Conversion failed", error: error.message });
    }
};