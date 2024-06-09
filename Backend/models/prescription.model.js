const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  medicines: [
    {
        medicineName: String,
        quantity: Number,
    }
  ],
  patientEmail: String,
  doctorEmail: String,
  description: String
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);
module.exports = Prescription;