import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const testDb = async () => {
    console.log("\n=======================================================");
    console.log("       🔍 MEDILAB DATABASE CONNECTION DIAGNOSIS        ");
    console.log("=======================================================");

    const uri = process.env.MONGOURI;
    console.log(`📌 MONGOURI in your .env:\n   ${uri}\n`);

    if (!uri) {
        console.log("❌ ERROR: MONGOURI is missing in .env file!");
        process.exit(1);
    }

    console.log("⏳ Attempting to connect to MongoDB Atlas...");
    try {
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
        console.log("✅ STATUS: CONNECTED SUCCESSFULLY TO MONGODB ATLAS!");
        console.log(`   Host    : ${mongoose.connection.host}`);
        console.log(`   Database: ${mongoose.connection.name}`);
        console.log("=======================================================\n");
        await mongoose.disconnect();
        process.exit(0);
    } catch (err) {
        console.log("\n❌ STATUS: CONNECTION FAILED");
        console.log(`   Exact Error Message: "${err.message}"\n`);
        
        console.log("-------------------------------------------------------");
        console.log("💡 DIAGNOSIS OF THIS ERROR:");
        if (err.message.includes("authentication failed")) {
            console.log("👉 Problem: AUTHENTICATION FAILED!");
            console.log("   Cluster mil gaya hai, lekin Atlas me aapka Username");
            console.log("   ya Password match nahi kar raha.");
            console.log("   FIX: Atlas Dashboard me 'Database Access' par jaakar");
            console.log("   User 'admin' ka password 'Gurjit123' set karein.");
        } else if (err.message.includes("ENOTFOUND")) {
            console.log("👉 Problem: DNS NOT FOUND!");
            console.log("   Cluster name galat hai ya internet issue hai.");
        } else if (err.message.includes("IP") || err.message.includes("whitelist") || err.message.includes("timed out")) {
            console.log("👉 Problem: IP NOT WHITELISTED!");
            console.log("   Atlas me 'Network Access' me jaakar 0.0.0.0/0 add karein.");
        } else {
            console.log("👉 Reason: " + err.message);
        }
        console.log("=======================================================\n");
        process.exit(1);
    }
};

testDb();
