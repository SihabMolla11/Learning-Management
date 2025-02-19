import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
dotenv.config();

const secretKey: any = process.env.JWT_SECRET_KEY;

interface AuthRequest extends Request {
  user?: { id: string };
}

export const authenticateUser = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      res.status(401).json({ error: "Unauthorized User" });
      return;
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, secretKey) as { id: string };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: "Unauthorized User" });
    return;
  }
};
