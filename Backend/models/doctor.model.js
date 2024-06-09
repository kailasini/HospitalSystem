const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  address: String,
  password: String,
  specialization: String,
  isActive: Boolean
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;