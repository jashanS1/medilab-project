import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import express from "express";
import dotenv from "dotenv";
import connectionDb from "./connection/db.connect.js";
import router from "./routes/userRouter.js";
import fileUpload from "express-fileupload";
import cors from "cors";

// Set up __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.PORT || 3333;

// Middleware setup
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
    useTempFiles: false
}));

// Ensure image upload directories exist
const userImagesDir = path.join(__dirname, "public/images/userImage");
if (!fs.existsSync(userImagesDir)) {
    fs.mkdirSync(userImagesDir, { recursive: true });
}

// Serve static uploaded images
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Connect to MongoDB
connectionDb();

// Routes
app.use("/", router);

// Start the server
app.listen(port, () => {
    console.log(`\n==========================================`);
    console.log(`🚀 MediLab Server active on: http://localhost:${port}`);
    console.log(`📡 Health endpoint: http://localhost:${port}/health`);
    console.log(`==========================================\n`);
});
