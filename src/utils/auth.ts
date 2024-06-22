import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/env";
import type { TokenData } from "../types/chps-compound";

export const generateHashedPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => await bcrypt.compare(password, hashedPassword);

export const generateAuthToken = (data: TokenData) =>
  jwt.sign(data, config.JWT_SECRET, { expiresIn: "1h" });

// Verify JWT token
// const verifyToken = (token) => {
//   const decoded = jwt.verify(token, secretKey);
//   return decoded;
// };
