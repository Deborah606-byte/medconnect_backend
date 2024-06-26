const Patient = require("../models/Patient");

// Get all patients
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find().populate(
      "emergencyContact",
      "name relationship contactNumber"
    );

    res.status(200).json({
      message: "Patients successfully fetched",
      data: patients,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An unexpected error has occurred", success: false });
  }
};

// Get patient by id
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate(
      "emergencyContact",
      "name relationship contactNumber"
    );

    if (!patient) {
      return res
        .status(404)
        .json({ message: "Patient not found", success: false });
    }

    // check if the patient belongs to the chips compound (user)
    if (patient.compoundId?.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "Forbidden, access denied", success: false });
    }

    res.status(200).json({
      message: "Patient successfully fetched",
      data: patient,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An unexpected error has occurred", success: false });
  }
};

// Create a new patient
exports.createPatient = async (req, res) => {
  const { email, gender } = req.body;
  const { userId: compoundId } = req.user;

  if (!email || !gender) {
    return res.status(400).json({
      message: "Email and gender are required",
      success: false,
    });
  }

  try {
    const newPatient = new Patient({ ...req.body, compoundId });
    await newPatient.save();

    res.status(201).json({
      message: "Patient added successfully",
      data: newPatient,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An unexpected error has occurred", success: false });
  }
};

// Update an existing patient
exports.updatePatient = async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("emergencyContact", "name relationship contactNumber");

    if (!updatedPatient) {
      return res
        .status(404)
        .json({ message: "Patient not found", success: false });
    }

    res.json({
      message: "Patient information updated successfully",
      data: updatedPatient,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An unexpected error has occurred", success: false });
  }
};

// Delete an existing patient
exports.deletePatient = async (req, res) => {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(req.params.id);

    if (!deletedPatient) {
      return res
        .status(404)
        .json({ message: "Patient not found", success: false });
    }

    res.json({
      message: "Patient details deleted successfully",
      data: deletedPatient,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An unexpected error has occurred", success: false });
  }
};
