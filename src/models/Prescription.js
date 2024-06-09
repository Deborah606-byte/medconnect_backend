const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
  name: String,
  dosage: String,
  frequency: String,
  duration: String
});

const prescriptionSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  doctorName: String,
  dateIssued: {
    type: Date,
    default: Date.now
  },
  medications: [medicationSchema],
  notes: String
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

prescriptionSchema.virtual('fullPrescription').get(function() {
  return `Prescribed by Dr. ${this.doctorName} on ${this.dateIssued.toDateString()}. Medications: ${this.medications.map(med => med.name).join(', ')}`;
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;
