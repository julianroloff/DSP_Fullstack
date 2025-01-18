import { spawn } from "child_process";
import path from "path";

const compareUValues = (storedFilePath, regulationsFilePath) => {
    return new Promise((resolve, reject) => {
        const scriptPath = path.resolve("src/utils/compare_uvalues.py");
        const process = spawn("python", [scriptPath, storedFilePath, regulationsFilePath]);

        let output = "";
        process.stdout.on("data", (data) => {
            output += data.toString();
        });

        process.stderr.on("data", (error) => {
            console.error("Error:", error.toString());
        });

        process.on("close", (code) => {
            if (code === 0) {
                try {
                    const results = JSON.parse(output);
                    resolve(results);
                } catch (error) {
                    reject(new Error("Failed to parse comparison results"));
                }
            } else {
                reject(new Error("Comparison script failed"));
            }
        });
    });
};

export { compareUValues };
