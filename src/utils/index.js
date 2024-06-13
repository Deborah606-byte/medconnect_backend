const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const envConfig = require("./envConfig");

const secretKey = envConfig.secretKey;

// Generate JWT token
const generateToken = (payload, expiryTime = "1h") => {
  const token = jwt.sign(payload, secretKey, { expiresIn: expiryTime });
  return token;
};

// Verify JWT token
const verifyToken = (token) => {
  const decoded = jwt.verify(token, secretKey);
  return decoded;
};

// hash password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

// compare password
const comparePassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

module.exports = {
  generateToken,
  verifyToken,
  hashPassword,
  comparePassword,
};
