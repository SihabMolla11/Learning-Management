import { Request, Response } from "express";
import { forgetPasswordService, signInService, signUpService } from "../services/user.service";

export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await signUpService(req.body);
    res.status(201).json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

export const signIn = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const response = await signInService(email, password);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

export const forgetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, old_password, new_password } = req.body;
    const response = await forgetPasswordService(email, old_password, new_password);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};
