const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  fees: { type: Number, required: true },
  date: { type: Date, default: Date.now }, // Appointment date (default to current time)
}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);
