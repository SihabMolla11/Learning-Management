import express, { Request, RequestHandler, Response } from "express";
import { forgetPassword, signIn, signUp } from "../controllers/auth.controller";

const userRoutes = express.Router();

const signUpHandler: RequestHandler = async (req: Request, res: Response) => {
  await signUp(req, res);
};

const signInHandler: RequestHandler = async (req: Request, res: Response) => {
  await signIn(req, res);
};

const forgetPasswordHandler: RequestHandler = async (req: Request, res: Response) => {
  await forgetPassword(req, res);
};

userRoutes.post("/auth/signUp", signUpHandler);

userRoutes.post("/auth/signIn", signInHandler);

userRoutes.post("/auth/forgetPassword", forgetPasswordHandler);

export default userRoutes;
