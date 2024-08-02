"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteResetToken = exports.getResetToken = exports.createResetToken = exports.updateUserPassword = exports.getUserByEmail = exports.getUserById = exports.createUser = void 0;
const user_1 = require("../models/user");
const auth_1 = require("../../utils/auth");
//User
const createUser = async (data) => {
    const hashedPassword = await auth_1.authUtil.generateHashedPassword(data.password);
    return await user_1.User.create({ ...data, password: hashedPassword });
};
exports.createUser = createUser;
const getUserById = async (id) => await user_1.User.findById(id);
exports.getUserById = getUserById;
const getUserByEmail = async (email) => {
    return await user_1.User.findOne({ email });
};
exports.getUserByEmail = getUserByEmail;
const updateUserPassword = async (id, password) => {
    const hashedPassword = await auth_1.authUtil.generateHashedPassword(password);
    return await user_1.User.findByIdAndUpdate(id, { password: hashedPassword });
};
exports.updateUserPassword = updateUserPassword;
//Reset Token
const createResetToken = async (user) => {
    const token = crypto.randomUUID();
    return await user_1.ResetToken.create({ user, token });
};
exports.createResetToken = createResetToken;
const getResetToken = async (user, token) => {
    return await user_1.ResetToken.findOne({ user, token });
};
exports.getResetToken = getResetToken;
const deleteResetToken = async (id) => await user_1.ResetToken.findByIdAndDelete(id);
exports.deleteResetToken = deleteResetToken;
