import express from "express";
import { forgetPassword, signIn, signUp } from "../controllers/auth.controller";

const userRoutes = express.Router();

userRoutes.post("/auth/signUp", signUp);

userRoutes.post("/auth/signIn", signIn);

userRoutes.post("/auth/forgetPassword", forgetPassword);

export default userRoutes;
