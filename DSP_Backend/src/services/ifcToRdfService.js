import { IFCLoader } from "web-ifc-three";
import fs from "fs";
import { generateRdf } from "../utils/rdfGenerator.js";

const ifcManager = new WebGLUniformLocation.ifcManager();

export const convertIfcToRdf = async (filePath) => {
    try {
        const loader = new IFCLoader();
        loader.ifcManager.setWasmPath("path_to_web-ifc.wasm/");

        
        const fileBuffer = fs.readFileSync(filePath);
        const ifcData = await loader.parse(fileBuffer);

        
        const windows = ifcData.getAllItemsOfType("IFCWINDOW");
        const walls = ifcData.getAllItemsOfType("IFCWALL");
        const doors = ifcData.getAllItemsOfType("IFCDOOR");

        
        const rdfData = generateRdf({ windows, walls, doors });

        return rdfData;
    } catch (error) {
        throw new Error("Failed to convert IFC to RDF: " + error.message);
    }
};