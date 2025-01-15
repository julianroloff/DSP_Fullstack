import { exec } from "child_process";
import path from "path";
import fs from "fs";

export const handleIfcUpload = (req, res) => {
    try {
        const ifcFilePath = req.file.path; // Path to the uploaded IFC file
        const rdfFilePath = path.join("uploads", `${req.file.filename}.ttl`); // Path for the output RDF file

        // Use the Anaconda Python interpreter explicitly
        const pythonInterpreter = "/opt/anaconda3/bin/python";

        // Command to execute the Python script
        const command = `${pythonInterpreter} src/utils/ifc_to_rdf.py ${ifcFilePath} ${rdfFilePath}`;
        
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error("Error executing Python script:", error);
                return res.status(500).json({ message: "Failed to process IFC file", error: stderr });
            }

            console.log("Python script output:", stdout);

            // Send the RDF file as a downloadable response
            res.download(rdfFilePath, "converted.ttl", (err) => {
                if (err) {
                    console.error("Error sending RDF file:", err);
                }

                // Clean up temporary files
                fs.unlinkSync(ifcFilePath); // Delete the uploaded IFC file
                fs.unlinkSync(rdfFilePath); // Delete the generated RDF file
            });
        });
    } catch (error) {
        console.error("Error during IFC-to-RDF conversion:", error);
        res.status(500).json({ message: "Conversion failed", error: error.message });
    }
};
