import { exec } from "child_process";
import path from "path";
import fs from "fs";

export const handleIfcUpload = (req, res) => {
    try {
        const ifcFilePath = path.resolve(req.file.path);
        const outputDirectory = path.resolve("src/stored_rdf_files"); // Ensure files are saved in this directory
        const rdfFilePath = path.join(outputDirectory, "stored.ttl"); // Always save as stored.ttl

        // Ensure the output directory exists
        if (!fs.existsSync(outputDirectory)) {
            fs.mkdirSync(outputDirectory, { recursive: true });
        }

        const pythonInterpreter = "/opt/anaconda3/bin/python"; // Adjust this path if needed

        // Command to execute the Python script
        const command = `${pythonInterpreter} src/utils/ifc_to_rdf.py ${ifcFilePath} ${rdfFilePath}`;
        
        exec(command, (error, stdout, stderr) => {
            console.log("Command executed:", command);
            console.log("stdout:", stdout);
            console.log("stderr:", stderr);
        
            if (error) {
                console.error("Error executing Python script:", error);
                return res.status(500).json({
                    message: "Failed to process IFC file",
                    error: stderr || error.message,
                });
            }
        
            res.status(200).json({
                message: "File successfully converted and stored",
                rdfFilePath,
            });
        
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
