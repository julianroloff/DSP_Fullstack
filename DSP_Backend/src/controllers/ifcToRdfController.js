import { exec } from "child_process";
import path from "path";
import fs from "fs";

export const handleIfcUpload = (req, res) => {
    try {
        const ifcFilePath = req.file.path; // Path to the uploaded IFC file
        const outputFileName = `${req.file.filename}.ttl`;
        const rdfFilePath = path.join("stored_rdf_files", outputFileName);

        if (!fs.existsSync("stored_rdf_files")) {
            fs.mkdirSync("stored_rdf_files");
        }

        const pythonInterpreter = "/opt/anaconda3/bin/python";

        const command = `${pythonInterpreter} src/utils/ifc_to_rdf.py ${ifcFilePath} ${rdfFilePath}`;
        
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error("Error executing Python script:", error);
                return res.status(500).json({ message: "Failed to process IFC file", error: stderr });
            }

            console.log("Python script output:", stdout);

            res.status(200).json({
                message: "File successfully converted and stored",
                rdfFilePath: rdfFilePath,
            });

            // Optionally clean up the uploaded IFC file
            fs.unlinkSync(ifcFilePath);
        });
    } catch (error) {
        console.error("Error during IFC-to-RDF conversion:", error);
        res.status(500).json({ message: "Conversion failed", error: error.message });
    }
};
