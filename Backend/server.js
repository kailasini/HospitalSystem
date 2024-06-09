const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Admin = require('./models/admin.model');
const Patient = require('./models/patient.model');
const Doctor = require('./models/doctor.model');
const Appointment = require('./models/appointment.model');
const Prescription = require('./models/prescription.model');
const Medicine = require('./models/medicine.model');
const Bill = require('./models/bill.model');
const app = express();
const PORT = process.env.PORT || 3000;
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hospital_management_system')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
  app.use(cors());

// Middleware
app.use(bodyParser.json());

app.get('/register-patient', (req, res) => {
  // Handle the GET request here
  res.send('GET request received for /register-patient');
});

// ADD PATIENT
app.post('/register-patient', async (req, res) => {
  try {
    // Create a new patient instance based on the request body
    const newPatient = new Patient({
      name: req.body.name,
      gender: req.body.gender,
      age: req.body.age,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      password: req.body.password
    });
    // Save the new patient to the database
    await newPatient.save();
    // Respond with a success message
    res.status(201).json({ message: "Patient added succesfully" });
  } catch (error) {
    // If an error occurs, respond with an error message
    res.status(500).json({ error: "Adding Patient failed" });
  }
});
// ADD DOCTOR
app.post('/add-doctor', async (req, res) => {
  try {
    // Create a new patient instance based on the request body
    const newDoctor = new Doctor({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      password: req.body.password,
      specialization: req.body.specialization,
      isActive: true
    });
    // Save the new patient to the database
    await newDoctor.save();
    // Respond with a success message
    res.status(201).json({ message: "Doctor added successfully" });
  } catch (error) {
    // If an error occurs, respond with an error message
    res.status(500).json({ error: "Adding Doctor failed" });
  }
});
//LOGIN
// Patient login
app.post('/patient-login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(200).json({ success: false, message: 'Invalid email.' });
    }
    else if (patient.password !== password) {
      return res.status(200).json({ success: false, message: 'Invalid password.' });
    }
    res.status(200).json({ success: true, message: 'Login successful!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin login
app.post('/admin-login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(200).json({ success: false, message: 'Invalid email' });
    }
    else if (admin.password !== password) {
      return res.status(200).json({ success: false, message: 'Invalid password.' });
    }
    res.status(200).json({ success: true, message: 'Login successful!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Doctor login
app.post('/doctor-login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const doctor = await Doctor.findOne({ email,isActive: true });
    if (!doctor) {
      return res.status(200).json({ success: false, message: 'Invalid email.' });
    }
    else if (doctor.password !== password) {
      return res.status(200).json({ success: false, message: 'Invalid password.' });
    }
    res.status(200).json({ success: true, message: 'Login successful!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//Check availability
app.post('/checkAvailability', async (req, res) => {
  const { doctorEmail, date, time } = req.body;
  const email = doctorEmail;
  try {
      const doctor = await Doctor.findOne({ email });
      const docAvail = await Appointment.findOne({doctorEmail})
      const doctorAvailability = await Appointment.findOne({ doctorEmail, date });
      const timeSlotAvailability = await Appointment.findOne({ doctorEmail, date, time });
      if(doctor)
      {
        if(docAvail){
        if (doctorAvailability) {
          if (timeSlotAvailability) {
              res.json({ message: 'Doctor not available at the selected time slot.' });
          } else {
              res.json({ message: 'Doctor is available.' });
          }
        } else {
          res.json({ message: 'Doctor is available' });
        }
        }else{
        res.json({message: 'Doctor is available.'})
        }
      }
      else{
      res.json({message: 'Invalid doctor.'})
      }
      
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: err.message });
  }
});
// Save Appointment
app.post('/saveAppointment', async (req, res) => {
  const { patientEmail, doctorEmail, date, time, reason } = req.body;
  try {
      const appointment = new Appointment({
          patientEmail,
          doctorEmail,
          date,
          time,
          reason
      });
      await appointment.save();
      res.json({message: "Apointment confirmed"})
  } catch (error) {
      console.error(error);
      res.status(500).json({message: "Failed to save"});
  }
});
// Retrieve Appointments
app.post('/appointments', async (req, res) => {
  const { doctorEmail } = req.body;
  try {
      const appointments = await Appointment.find({ doctorEmail }, 'patientEmail date time reason');
      res.json(appointments);
  } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
  }
});
//medicine prescription
app.post('/prescriptions', async (req, res) => {
  const { medicines, patientEmail, doctorEmail, description } = req.body;
  try {
      const prescription = new Prescription({
          medicines,
          patientEmail,
          doctorEmail,
          description
      });
      await prescription.save();
      res.json({ message: 'Prescription saved successfully!' });
  } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
  }
});
//view medicines
app.post('/viewMedicines', async (req, res) => {
  const { patientEmail } = req.body;
  try {
      const prescribedMedicines = await Prescription.find({ patientEmail });
      res.json({ prescribedMedicines });
  } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
  }
});

// Route to get the last prescribed medicine record for a specific patient
app.post('/api/prescribedmedicines', async (req, res) => {
  const { patientEmail } = req.body;
  try {
    const prescribedMedicines = await Prescription.find({ patientEmail });
    res.json(prescribedMedicines);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.post('/api/medicine', async (req, res) => {
  const { medicineName } = req.body;
  try {
    const medicine = await Medicine.findOne({ medicineName });
    res.json(medicine);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.post('/api/generatebill', async (req, res) => {
  const { patientEmail } = req.body;
  try {
    const prescribedMedicines = await Prescription.findOne({ patientEmail }).sort({ _id: -1 }).limit(1);
    if (!prescribedMedicines) {
      res.json({ bill: 0 });
      return;
    }
    const medicines = prescribedMedicines.medicines;
    let bill = 0;
    for (let i = 0; i < medicines.length; i++) {
      const medicineName = medicines[i].medicineName;
      const quantity = medicines[i].quantity;
      const medicine = await Medicine.findOne({ medicineName });
      bill += medicine.cost * quantity;
    }
    const newBill = new Bill({
      patientEmail: patientEmail,
      medicines: medicines,
      totalBill: bill,
      status: "unpaid", // New bill is marked as unpaid by default
      billId: generateBillId() // Generate bill ID
    });
    await newBill.save();
    res.json({bill});
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});
function generateBillId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let billId = '';
  for (let i = 0; i < 6; i++) {
    billId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return billId;
}
// API endpoint to fetch bills by patient email
app.post('/bills', async (req, res) => {
  const { patientEmail } = req.body;
  try {
      const bills = await Bill.find({ patientEmail });
      res.json( {bills} );
  } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
  }
});
// Route to make payment for a specific bill
app.put('/api/bill/:billId/pay', async (req, res) => {
  try {
    const bill = await Bill.findOneAndUpdate(
      { billId: req.params.billId, status: 'unpaid' }, // Check if the bill is unpaid
      { $set: { status: 'paid' } }, // Set the status to paid
      { new: true }
    );
    if (!bill) {
      return res.status(400).json({ message: 'Bill has already been paid or not found' });
    }
    res.json({ message: 'Payment successful' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.get('/api/doctors', async (req, res) => {
  try {
    const doctors = await Doctor.find({isActive: true}, 'email name specialization');
    res.json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});
app.post('/api/inactivate-doctor', async (req, res) => {
  try {
    const { email } = req.body;
    // Check if the doctor exists
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(200).json({ message: 'Doctor not found.' });
    }
    // Inactivate the doctor's account
    doctor.isActive = false;
    await doctor.save();

    res.json({ message: 'Doctor account inactivated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});
app.get('/api/payments', async (req, res) => {
  try {
    const payments = await Bill.find({}, 'patientEmail totalBill status');
    res.json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});
app.get('/api/patients', async (req, res) => {
  try {
    const patients = await Patient.find({}, 'email name age gender');
    res.json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
