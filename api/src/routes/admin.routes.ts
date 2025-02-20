import express from "express";
import { createCourse, getCourseList, updateCourse } from "../controllers/admin.controller";
import { authenticateUser } from "../utils/auth.middleware";

const adminRoutes = express.Router();

adminRoutes.post("/createCourse", authenticateUser, createCourse);

adminRoutes.get("/course-list", authenticateUser, getCourseList);

adminRoutes.patch("/update-course/:id", authenticateUser, updateCourse);

export default adminRoutes;
