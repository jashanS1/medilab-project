import express from "express";
import userController from "../controller/userController.js";

const router = express.Router();

// Authentication
router.post("/signUp", userController.signUp);
router.post("/login", userController.login);

// Appointments & Bookings
router.post("/appointment", userController.bookAppointment);

// Contact Messages
router.post("/contact", userController.submitContact);

// Reports Lookup
router.get("/report", userController.getReport);

// Backend Storage Inspection & Examiner Endpoints
router.get("/appointments", userController.getAppointments);
router.get("/contacts", userController.getContacts);
router.get("/users", userController.getUsers);
router.get("/stats", userController.getStats);

// Health check endpoint
router.get("/health", (req, res) => {
    res.json({
        success: true,
        status: 200,
        message: "MediLab Diagnostic API is running smoothly",
        timestamp: new Date().toISOString()
    });
});

export default router;
