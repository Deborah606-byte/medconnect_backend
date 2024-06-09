const Prescription = require("../models/Prescription");

exports.getAllPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find().populate(
      "patientId",
      "_id firstName lastName"
    );
    res.json(prescriptions);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

exports.getPrescriptionById = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id).populate(
      "patientId",
      "_id firstName lastName"
    );
    if (!prescription) return res.status(404).send("Prescription not found");
    res.json(prescription);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

exports.createPrescription = async (req, res) => {
  try {
    const newPrescription = new Prescription(req.body);
    await newPrescription.save();
    res.status(201).json({
      message: "Prescription added successfully",
      newPrescription,
    });
  } catch (error) {
    res.status(400).send("Bad request");
  }
};

exports.updatePrescription = async (req, res) => {
  try {
    const updatedPrescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("patientId", "_id firstName lastName");
    if (!updatedPrescription)
      return res.status(404).send("Prescription not found");
    res.json(updatedPrescription);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

exports.deletePrescription = async (req, res) => {
  try {
    const deletedPrescription = await Prescription.findByIdAndDelete(
      req.params.id
    );
    if (!deletedPrescription)
      return res.status(404).send("Prescription not found");
    res.json(deletedPrescription);
  } catch (error) {
    res.status(500).send("Server error");
  }
};
