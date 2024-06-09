const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
  patientEmail: String,
  medicines: [
    {
      medicineName: String,
      quantity: Number
    }
  ],
  totalBill: Number,
  status: String,
  billId: String
});

const Bill = mongoose.model('Bill', BillSchema);

module.exports = Bill;