import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    bookingId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    test: { type: String, required: true },
    collectionType: { type: String, default: "Home collection" },
    date: { type: String, required: true },
    timing: { type: String, default: "08:30 AM - 09:30 AM" },
    note: { type: String, default: "" },
    status: { type: String, default: "Confirmed" }
}, { timestamps: true });

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
