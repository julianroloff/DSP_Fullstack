import { exec } from "child_process";
import path from "path";
import fs from "fs";

export const generateSummary = (rdfFilePath, res) => {
    try {
        const summaryDirectory = path.resolve("src/data/summaries");
        const summaryFilePath = path.join(summaryDirectory, "summary.csv");

        // Ensure the summary directory exists
        if (!fs.existsSync(summaryDirectory)) {
            fs.mkdirSync(summaryDirectory, { recursive: true });
        }

        const pythonInterpreter = "/Users/jeremypalmerio/opt/miniconda3/envs/DSP/bin/python"; // Adjust as needed
        const summaryCommand = `${pythonInterpreter} src/utils/extractSummary.py "${rdfFilePath}" "${summaryFilePath}"`;

        exec(summaryCommand, (error, stdout, stderr) => {
            console.log("Summary command executed:", summaryCommand);
            console.log("stdout:", stdout);
            console.log("stderr:", stderr);

            if (error) {
                console.error("Error generating summary:", error);
                return res.status(500).json({
                    message: "Failed to generate summary",
                    error: stderr || error.message,
                });
            }

            res.status(200).json({
                message: "Summary successfully generated",
                summaryFilePath,
            });
        });
    } catch (error) {
        console.error("Error during summary generation:", error);
        res.status(500).json({ message: "Summary generation failed", error: error.message });
    }
};