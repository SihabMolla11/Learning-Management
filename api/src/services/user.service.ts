import bcryptjs from "bcryptjs";
import User from "../models/user.model";
import { signToken } from "../utils/jwt.util";

export const signUpService = async (userData: any) => {
  const { first_name, last_name, email, phone, password, address } = userData;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcryptjs.hash(password, 10);
  const newUser = new User({
    first_name,
    last_name,
    email,
    phone,
    password: hashedPassword,
    address,
    user_role: "USER",
  });

  await newUser.save();
  const token = signToken(newUser.id, newUser.email, newUser.user_role);

  return {
    user: {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      user_role: newUser.user_role,
    },
    token,
    message: "Registration successful",
  };
};

export const signInService = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = signToken(user.id, user.email, user.user_role);

  return {
    message: "Login successful",
    token,
    user: {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      user_role: user.user_role,
    },
  };
};

export const forgetPasswordService = async (
  email: string,
  oldPassword: string,
  newPassword: string
) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcryptjs.compare(oldPassword, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const hashedPassword = await bcryptjs.hash(newPassword, 10);

  const updatedUser = await User.findByIdAndUpdate(
    user.id,
    { password: hashedPassword },
    { new: true }
  );

  return {
    message: "Password updated successfully",
    user: {
      first_name: updatedUser?.first_name,
      last_name: updatedUser?.last_name,
      email: updatedUser?.email,
      user_role: updatedUser?.user_role,
    },
  };
};
