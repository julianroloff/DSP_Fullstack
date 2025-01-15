import express from "express";
import cors from "cors";
import buildingRoutes from "./routes/buildingRoutes.js";
import logger from "./middleware/logger.js";
import ifcRoutes from "./routes/ifcRoutes.js"


const app = express();

//Middleware
app.use(logger);

//Enables sharing between two different ports -> Uploading ifc file from frontend to backend
app.use(cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
}));

//Routes
app.use(buildingRoutes);

app.use("/api", ifcRoutes);

export default app;
