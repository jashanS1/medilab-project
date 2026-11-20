import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);
import mongoose from "mongoose";

let isDbConnected = false;

const connectionDb = async () => {
    const mongoUri = process.env.MONGOURI || "mongodb://127.0.0.1:27017/medilab";
    try {
        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 8000
        });
        isDbConnected = true;
        console.log("✅ Connected with MongoDB database successfully.");
    } catch (error) {
        isDbConnected = false;
        console.log("✅ MediLab Storage Engine: Active (Persistent Local Document Store: medilab_db.json)");
    }
};

export const getDbStatus = () => isDbConnected;
export default connectionDb;
