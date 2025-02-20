import express from "express";
import { createCourse, getCourseList } from "../controllers/admin.controller";
import { authenticateUser } from "../utils/auth.middleware";

const adminRoutes = express.Router();


adminRoutes.post("/createCourse", authenticateUser, createCourse);

adminRoutes.get("/course-list", authenticateUser, getCourseList);


export default adminRoutes;
