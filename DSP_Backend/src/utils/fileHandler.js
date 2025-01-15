import fs from "fs";

export const deleteFile = (filePath) => {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(`Failed to delete file: ${filePath}`, err);
        } else {
            console.log(`Deleted file: ${filePath}`);
        }
    });
};
