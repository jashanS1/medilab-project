import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import userModel from "./model/userModel.js";
import Appointment from "./model/appointmentModel.js";
import Contact from "./model/contactModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbFilePath = path.join(__dirname, "data/medilab_db.json");

dotenv.config();

const mongoUri = process.env.MONGOURI || "mongodb://127.0.0.1:27017/medilab";
const saltRound = 10;

const seedDatabase = async () => {
    console.log("\n=======================================================");
    console.log("   🏥 MEDILAB DIAGNOSTICS - DATABASE SEEDING UTILITY   ");
    console.log("=======================================================");

    const demoPasswordHash = await bcrypt.hash("123456", saltRound);

    const usersToSeed = [
        {
            name: "Dr. Gurjit Singh (Lab Administrator)",
            email: "admin@medilab.com",
            mobile: 9811122233,
            password: demoPasswordHash,
            passwordHash: demoPasswordHash,
            isAdmin: 0,
            image: "default-admin.webp",
            createdAt: new Date().toISOString()
        },
        {
            name: "Rahul Sharma",
            email: "demo@medilab.com",
            mobile: 9876543210,
            password: demoPasswordHash,
            passwordHash: demoPasswordHash,
            isAdmin: 1,
            image: "default-user.webp",
            createdAt: new Date().toISOString()
        },
        {
            name: "Priya Verma",
            email: "priya.verma@gmail.com",
            mobile: 9822334455,
            password: demoPasswordHash,
            passwordHash: demoPasswordHash,
            isAdmin: 1,
            image: "default-user.webp",
            createdAt: new Date().toISOString()
        },
        {
            name: "Amit Kumar",
            email: "amit.kumar@outlook.com",
            mobile: 9899887766,
            password: demoPasswordHash,
            passwordHash: demoPasswordHash,
            isAdmin: 1,
            image: "default-user.webp",
            createdAt: new Date().toISOString()
        },
        {
            name: "Sunita Devi",
            email: "sunita.devi@yahoo.com",
            mobile: 9812345678,
            password: demoPasswordHash,
            passwordHash: demoPasswordHash,
            isAdmin: 1,
            image: "default-user.webp",
            createdAt: new Date().toISOString()
        }
    ];

    const appointmentsToSeed = [
        {
            bookingId: "ML-2026-8841",
            name: "Rahul Sharma",
            phone: "9876543210",
            email: "demo@medilab.com",
            test: "Complete Blood Count (CBC) with Differential",
            collectionType: "Home collection",
            date: "2026-11-21",
            timing: "07:30 AM - 08:30 AM (Fasting Slot)",
            note: "Patient fasting required for 10 hours before sample collection.",
            status: "Approved",
            createdAt: new Date().toISOString()
        },
        {
            bookingId: "ML-2026-9124",
            name: "Priya Verma",
            phone: "9822334455",
            email: "priya.verma@gmail.com",
            test: "Comprehensive Lipid Profile & Cholesterol",
            collectionType: "Walk-in lab",
            date: "2026-11-21",
            timing: "09:00 AM - 10:00 AM (Morning Slot)",
            note: "Annual preventive cardiac risk evaluation.",
            status: "Approved",
            createdAt: new Date().toISOString()
        },
        {
            bookingId: "ML-2026-7352",
            name: "Amit Kumar",
            phone: "9899887766",
            email: "amit.kumar@outlook.com",
            test: "Thyroid Stimulating Hormone (TSH / FT4)",
            collectionType: "Home collection",
            date: "2026-11-22",
            timing: "10:30 AM - 11:30 AM (Mid-Day Slot)",
            note: "Early morning phlebotomy requested at 07:30 AM.",
            status: "Pending Analysis",
            createdAt: new Date().toISOString()
        },
        {
            bookingId: "ML-2026-6419",
            name: "Sunita Devi",
            phone: "9812345678",
            email: "sunita.devi@yahoo.com",
            test: "HbA1c & Glycated Hemoglobin Diabetic Panel",
            collectionType: "Home collection",
            date: "2026-11-22",
            timing: "12:00 PM - 01:00 PM (Afternoon Slot)",
            note: "Diabetic quarterly glycemic control checkup.",
            status: "Approved",
            createdAt: new Date().toISOString()
        },
        {
            bookingId: "ML-2026-5510",
            name: "Vikas Malhotra",
            phone: "9877001122",
            email: "vikas.m@gmail.com",
            test: "Vitamin D3 (25-Hydroxy) & Vitamin B12",
            collectionType: "Walk-in lab",
            date: "2026-11-23",
            timing: "03:30 PM - 04:30 PM (Evening Slot)",
            note: "Fatigue and bone density consultation follow-up.",
            status: "Sample Collected",
            createdAt: new Date().toISOString()
        },
        {
            bookingId: "ML-2026-4208",
            name: "Anjali Gupta",
            phone: "9833445566",
            email: "anjali.g@gmail.com",
            test: "Liver Function Test (LFT Profile)",
            collectionType: "Home collection",
            date: "2026-11-23",
            timing: "05:00 PM - 06:00 PM (Late Slot)",
            note: "Pre-operative biochemical screening.",
            status: "Pending Analysis",
            createdAt: new Date().toISOString()
        }
    ];

    const contactsToSeed = [
        {
            name: "Pooja Sharma",
            email: "pooja.s@gmail.com",
            topic: "Home Sample Collection",
            message: "Do you provide home sample collection in Phase 7, Mohali on Sunday mornings?",
            status: "Received",
            createdAt: new Date().toISOString()
        },
        {
            name: "Rajesh Malhotra",
            email: "rajesh.m@outlook.com",
            topic: "Corporate Health Packages",
            message: "Inquiry regarding corporate diagnostic packages for an office of 45 employees.",
            status: "In Review",
            createdAt: new Date().toISOString()
        },
        {
            name: "Simran Kaur",
            email: "simran.k@yahoo.com",
            topic: "Report Turnaround Time",
            message: "How many hours after sample collection is the NABL approved PDF report generated online?",
            status: "Resolved",
            createdAt: new Date().toISOString()
        }
    ];

    // Always persist to local document storage file
    const dataDir = path.dirname(dbFilePath);
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    fs.writeFileSync(dbFilePath, JSON.stringify({
        users: usersToSeed,
        appointments: appointmentsToSeed,
        contacts: contactsToSeed
    }, null, 2), "utf8");

    let mongoSynced = false;
    try {
        console.log("⏳ Syncing with MongoDB Atlas database: " + mongoUri);
        await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 8000 });
        for (const u of usersToSeed) {
            await userModel.findOneAndUpdate({ email: u.email }, { $set: u }, { upsert: true, new: true });
        }
        for (const appt of appointmentsToSeed) {
            await Appointment.findOneAndUpdate({ bookingId: appt.bookingId }, { $set: appt }, { upsert: true, new: true });
        }
        for (const c of contactsToSeed) {
            await Contact.create(c);
        }
        mongoSynced = true;
        console.log("✅ Successfully written 5 Users, 6 Appointments, 3 Contacts to MongoDB Atlas!");
    } catch (e) {
        console.log("⚠️ MongoDB Atlas sync note:", e.message);
        mongoSynced = false;
    }

    console.log("🌱 [1/3] Registered Patients & Lab Staff -> 5 Accounts Prepared");
    console.log("🌱 [2/3] Diagnostic Lab Appointments    -> 6 Records with Reference IDs Prepared");
    console.log("🌱 [3/3] Patient Contact Inquiries       -> 3 Queries Prepared");

    console.log("\n=======================================================");
    console.log("🎉 DATABASE SEEDING COMPLETED SUCCESSFULLY!");
    console.log("=======================================================");
    if (mongoSynced) {
        console.log("📡 Storage Mode: [CONNECTED TO MONGODB + LOCAL JSON SYNC]");
    } else {
        console.log("📡 Storage Mode: [PERSISTENT DOCUMENT STORAGE (medilab_db.json)]");
        console.log("   (100% Offline Resilience - No external cloud or local mongo daemon needed!)");
    }
    console.log("\n📁 Backend Storage Location: backend/data/medilab_db.json");
    console.log("📊 Summary of Inserted Records:");
    console.log("  • Users         : 5 Records (Admin: Dr. Gurjit Singh, Patients)");
    console.log("  • Appointments  : 6 Records (CBC, Lipid, Thyroid, HbA1c, LFT, Vit D3)");
    console.log("  • Contacts      : 3 Records (Patient Inquiries)");
    console.log("=======================================================\n");

    process.exit(0);
};

seedDatabase();
