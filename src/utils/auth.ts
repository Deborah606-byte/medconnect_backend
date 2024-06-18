import bcrypt from "bcrypt";

export const generateHashedPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => await bcrypt.compare(password, hashedPassword);

// Generate JWT token
// const generateToken = (payload, expiryTime = "1h") => {
//   const token = jwt.sign(payload, secretKey, { expiresIn: expiryTime });
//   return token;
// };

// Verify JWT token
// const verifyToken = (token) => {
//   const decoded = jwt.verify(token, secretKey);
//   return decoded;
// };
