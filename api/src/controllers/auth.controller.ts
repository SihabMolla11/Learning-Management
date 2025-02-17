import { Request, Response } from "express";
import { signUpService, signInService, forgetPasswordService } from "../services/user.service";

export const signUp = async (req: Request, res: Response): Promise<Response> => {
  try {
    const result = await signUpService(req.body);
    return res.status(201).json(result);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

export const signIn = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const result = await signInService(email, password);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

export const forgetPassword = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, old_password, new_password } = req.body;
    const result = await forgetPasswordService(email, old_password, new_password);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};
