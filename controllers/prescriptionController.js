const { default: mongoose } = require("mongoose");
const Patient = require("../models/Patient");
const Prescription = require("../models/Prescription");

// Get all prescriptions
exports.getAllPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find().populate(
      "patientId",
      "_id firstName lastName"
    );

    res.status(200).json({
      message: "Prescriptions successfully retrieved",
      data: prescriptions,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An unexpected error has occurred", success: false });
  }
};

// Get prescription by id
exports.getPrescriptionById = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id).populate(
      "patientId",
      "_id firstName lastName"
    );

    if (!prescription) {
      return res
        .status(404)
        .json({ message: "Prescription not found", success: false });
    }

    res.status(200).json({
      message: "Prescription successfully retrieved",
      data: prescription,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An unexpected error has occurred", success: false });
  }
};

// Create a new prescription
exports.createPrescription = async (req, res) => {
  const { patientId, medications, doctorName } = req.body;

  if (!patientId || !medications || !doctorName) {
    return res.status(400).json({
      message: "Patient ID, medications, and doctor name are required",
      success: false,
    });
  }

  try {
    // check if patient id is a valid ObjectId
    if (!mongoose.isValidObjectId(patientId)) {
      return res
        .status(400)
        .json({ message: "Invalid patient ID", success: false });
    }

    // check if patient already exists
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res
        .status(404)
        .json({ message: "Patient not found", success: false });
    }

    const newPrescription = new Prescription(req.body);

    await newPrescription.save();

    res.status(201).json({
      message: "Prescription added successfully",
      data: newPrescription,
      success: true,
    });
  } catch (error) {
    console.log({ error });
    res
      .status(500)
      .json({ message: "An unexpected error has occurred", success: false });
  }
};

// Update an existing prescription
exports.updatePrescription = async (req, res) => {
  try {
    const updatedPrescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("patientId", "_id firstName lastName");

    if (!updatedPrescription) {
      return res
        .status(404)
        .json({ message: "Prescription not found", success: false });
    }

    res.status(200).json({
      message: "Prescription updated successfully",
      data: updatedPrescription,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An unexpected error has occurred", success: false });
  }
};

// Delete an existing prescription
exports.deletePrescription = async (req, res) => {
  try {
    const deletedPrescription = await Prescription.findByIdAndDelete(
      req.params.id
    );

    if (!deletedPrescription) {
      return res
        .status(404)
        .json({ message: "Prescription not found", success: false });
    }

    res.status(200).json({
      message: "Prescription deleted successfully",
      data: deletedPrescription,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An unexpected error has occurred", success: false });
  }
};
