import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User, { IUser } from "../models/User";
import { JWT_SECRET } from "../config/env";

// --- (NEW) DEFINE A DTO INTERFACE ---
// This interface describes the plain data object we expect for registration.
export interface UserRegistrationData {
  name: string;
  email: string;
  password: string;
}

export const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: "1d",
  });
};

// --- (MODIFIED) UPDATE THE FUNCTION SIGNATURE ---
// Change the 'userData' parameter to use our new DTO interface.
export const registerUser = async (
  userData: UserRegistrationData
): Promise<IUser> => {
  const { name, email, password } = userData;

  const user = new User({
    name,
    email,
    passwordHash: password, // The pre-save hook in the User model will hash this.
  });
  await user.save();
  return user;
};

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  return User.findOne({ email });
};

export const validatePassword = async (
  password: string,
  passwordHash: string
): Promise<boolean> => {
  return bcrypt.compare(password, passwordHash);
};
