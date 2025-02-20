import express from "express";
import {
  createCourse,
  deleteCourse,
  getCourseDetail,
  getCourseList,
  updateCourse,
} from "../controllers/admin/admin.course.controller";
import { authenticateUser } from "../utils/auth.middleware";

const adminRoutes = express.Router();

adminRoutes.post("/createCourse", authenticateUser, createCourse);

adminRoutes.get("/course-list", authenticateUser, getCourseList);

adminRoutes.get("/course-detail/:id", authenticateUser, getCourseDetail);

adminRoutes.patch("/update-course/:id", authenticateUser, updateCourse);

adminRoutes.delete("/delete-course/:id", authenticateUser, deleteCourse);

export default adminRoutes;
