const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientEmail: String,
  doctorEmail: String,
  date: Date,
  time: String,
  reason: String
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;