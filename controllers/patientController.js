const Patient = require("../models/Patient");

exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find().populate(
      "emergencyContact",
      "name relationship contactNumber"
    );
    res.json(patients);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate(
      "emergencyContact",
      "name relationship contactNumber"
    );
    if (!patient) return res.status(404).send("Patient not found");
    res.json(patient);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

exports.createPatient = async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    await newPatient.save();
    res.status(201).json({
        message:"Patient added successfully",
        newPatient
    });
  } catch (error) {
    res.status(400).send("Bad request");
  }
};

exports.updatePatient = async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("emergencyContact", "name relationship contactNumber");
    if (!updatedPatient) return res.status(404).send("Patient not found");
    res.json({
        message: "Patient information updated successfully",
        updatedPatient
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

exports.deletePatient = async (req, res) => {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
    if (!deletedPatient) return res.status(404).send("Patient not found");
    res.json({
        message: "Patient details deleted successfully",
        deletedPatient
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
};
