const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
    medicineName: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    }
});

const Medicine = mongoose.model('Medicine', MedicineSchema);

module.exports = Medicine;
