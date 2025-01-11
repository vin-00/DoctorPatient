const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  specialty: { type: String, required: true },
  fees: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Doctor", doctorSchema);
