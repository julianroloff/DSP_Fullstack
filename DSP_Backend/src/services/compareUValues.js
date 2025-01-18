import { exec } from "child_process";
import path from "path";

export const compareUValues = (storedFilePath, regulationsFilePath) => {
    return new Promise((resolve, reject) => {
        const pythonScript = path.resolve("src/utils/compare_uvalues.py");
        const command = `python "${pythonScript}" "${storedFilePath}" "${regulationsFilePath}"`;

        console.log("Executing command:", command);

        exec(command, (error, stdout, stderr) => {
            console.log("Command executed:", command);
            console.log("stdout:", stdout);
            console.log("stderr:", stderr);

            if (error) {
                console.error("Error executing comparison script:", error);
                reject(new Error("Comparison script failed"));
                return;
            }

            try {
                const results = JSON.parse(stdout.trim());
                console.log("Parsed results:", results);
                resolve(results);
            } catch (parseError) {
                console.error("Error parsing comparison results:", parseError);
                reject(new Error("Failed to parse comparison results"));
            }
        });
    });
};
