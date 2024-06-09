const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: String,
  gender: String,
  age: Number,
  email: String,
  phone: Number,
  address: String,
  password: String
});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;