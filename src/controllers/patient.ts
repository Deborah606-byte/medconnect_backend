import AppError from "../utils/app-error";
import { catchAsync } from "../utils/catch-async";
import { STATUSES } from "../config/constants";
import { StatusCodes } from "http-status-codes";
import { createPatient, fetchAllPatients } from "../db/queries/patient";

export const addPatient = catchAsync(async (req, res) => {
  const data = req.body;
  const patient = await createPatient(data);

  return res
    .status(StatusCodes.CREATED)
    .json({ status: STATUSES.SUCCESS, data: patient });
});

export const getAllPatients = catchAsync(async (req, res) => {
  //modify to allow only for super admins
  const patients = await fetchAllPatients();
  return res.json({ status: STATUSES.SUCCESS, data: patients });
});

// // Get patient by id
// exports.getPatientById = async (req, res) => {
//   try {
//     const patient = await Patient.findById(req.params.id).populate(
//       "emergencyContact",
//       "name relationship contactNumber"
//     );

//     if (!patient) {
//       return res
//         .status(404)
//         .json({ message: "Patient not found", success: false });
//     }

//     // check if the patient belongs to the chips compound (user)
//     if (patient.compoundId?.toString() !== req.user.userId) {
//       return res
//         .status(403)
//         .json({ message: "Forbidden, access denied", success: false });
//     }

//     res.status(200).json({
//       message: "Patient successfully fetched",
//       data: patient,
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//     res
//       .status(500)
//       .json({ message: "An unexpected error has occurred", success: false });
//   }
// };

// // Update an existing patient
// exports.updatePatient = async (req, res) => {
//   try {
//     const updatedPatient = await Patient.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     ).populate("emergencyContact", "name relationship contactNumber");

//     if (!updatedPatient) {
//       return res
//         .status(404)
//         .json({ message: "Patient not found", success: false });
//     }

//     res.json({
//       message: "Patient information updated successfully",
//       data: updatedPatient,
//       success: true,
//     });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "An unexpected error has occurred", success: false });
//   }
// };

// // Delete an existing patient
// exports.deletePatient = async (req, res) => {
//   try {
//     const deletedPatient = await Patient.findByIdAndDelete(req.params.id);

//     if (!deletedPatient) {
//       return res
//         .status(404)
//         .json({ message: "Patient not found", success: false });
//     }

//     res.json({
//       message: "Patient details deleted successfully",
//       data: deletedPatient,
//       success: true,
//     });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "An unexpected error has occurred", success: false });
//   }
// };
