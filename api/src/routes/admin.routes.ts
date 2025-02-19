import express from "express";
import { createCourse } from "../controllers/admin.controller";
import { authenticateUser } from "../utils/auth.middleware";

const adminRoutes = express.Router();


adminRoutes.post("/createCourse", authenticateUser, createCourse);

export default adminRoutes;
