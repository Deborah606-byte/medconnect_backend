const User = require("../models/User");
const { getUser } = require("../utils/getUser");

// Create a new user
// exports.createUser = async (req, res) => {
//   const {
//     compoundName,
//     location,
//     region,
//     district,
//     operatingHours,
//     email,
//     password,
//     termsAndConditions,
//   } = req.body;

//   if (
//     !compoundName ||
//     !location ||
//     !region ||
//     !district ||
//     !operatingHours ||
//     !email ||
//     !password ||
//     !termsAndConditions
//   ) {
//     return res
//       .status(400)
//       .json({ message: "All fields are required", success: false });
//   }

//   const newUser = new User(req.body);

//   try {
//     const savedUser = await newUser.save();

//     res.status(201).json({
//       message: "User created successfully",
//       data: getUser(savedUser),
//       success: true,
//     });
//   } catch (err) {
//     console.log({ err, errors: err?.errors });
//     res.status(500).json({ message: err.message, success: false });
//   }
// };

// Get user by id
// exports.getUserById = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res
//         .status(404)
//         .json({ message: "User not found", success: false });
//     }
//     res.status(200).json({
//       message: "User retrieved successfully",
//       data: getUser(user),
//       success: true,
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message, success: false });
//   }
// };

// Update an existing user
// exports.updateUser = async (req, res) => {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true } // Returns the updated document
//     );
//     if (!updatedUser) {
//       return res
//         .status(404)
//         .json({ message: "User not found", success: false });
//     }
//     res.json({
//       message: "User updated successfully",
//       data: getUser(updatedUser),
//       success: true,
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message, success: false });
//   }
// };

// Delete an existing user
// exports.deleteUser = async (req, res) => {
//   try {
//     const deletedUser = await User.findByIdAndDelete(req.params.id);
//     if (!deletedUser) {
//       return res
//         .status(404)
//         .json({ message: "User not found", success: false });
//     }
//     res.json({
//       message: "User deleted successfully",
//       data: getUser(deletedUser),
//       success: true,
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message, success: false });
//   }
// };

// Get all users
// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find({}).select("-password");
//     res.json({
//       message: "Users retrieved successfully",
//       data: users.map((user) => getUser(user)),
//       success: true,
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message, success: false });
//   }
// };
