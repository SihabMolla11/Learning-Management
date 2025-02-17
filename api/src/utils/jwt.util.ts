import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const secretKey: any = process.env.JWT_SECRET_KEY;

export const signToken = (id: string, email: string, user_role: string): string => {
  const payload = { id, email, user_role };
  return jwt.sign(payload, secretKey);
};

export const verifyToken = (token: string): string | jwt.JwtPayload => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
