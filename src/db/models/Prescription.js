const mongoose = require("mongoose");

const medicationSchema = new mongoose.Schema({
  name: String,
  dosage: String,
  frequency: String,
  duration: String,
});

const prescriptionSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctorName: {
      type: String,
      required: [true, "Doctor name is required"],
    },
    dateIssued: {
      type: Date,
      default: Date.now,
    },
    medications: {
      type: [medicationSchema],
      required: [true, "Medications are required"],
    },
    notes: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

prescriptionSchema.virtual("fullPrescription").get(function () {
  return `Prescribed by Dr. ${
    this.doctorName
  } on ${this.dateIssued?.toDateString()}. Medications: ${this.medications.map((med) => med.name).join(", ")}`;
});

const Prescription = mongoose.model("Prescription", prescriptionSchema);

module.exports = Prescription;
