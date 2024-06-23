import { User, ResetToken } from "../models/user";
import { authUtil } from "../../utils/auth";
import type { ObjectId } from "mongodb";
import type { UserData } from "../../types/chps-compound";

//User
export const createUser = async (data: UserData) => {
  const hashedPassword = await authUtil.generateHashedPassword(data.password);
  return await User.create({ ...data, password: hashedPassword });
};
export const getUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

//Reset Token

export const createResetToken = async (user: ObjectId) => {
  const token = crypto.randomUUID();
  return await ResetToken.create({ user, token });
};
