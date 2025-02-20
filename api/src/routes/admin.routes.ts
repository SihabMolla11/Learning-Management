import express from "express";
import {
  createCourse,
  deleteCourse,
  getCourseDetail,
  getCourseList,
  updateCourse,
} from "../controllers/admin/admin.course.controller";
import { createLecture, deleteLecture, getLectureDetail, getLectureList, updateLecture } from "../controllers/admin/admin.lecture.controller";
import {
  createModule,
  deleteModule,
  getModuleDetail,
  getModuleList,
  updateModule,
} from "../controllers/admin/admin.module.controller";
import { authenticateUser } from "../utils/auth.middleware";

const adminRoutes = express.Router();

adminRoutes.post("/create-course", authenticateUser, createCourse);
adminRoutes.get("/course-list", authenticateUser, getCourseList);
adminRoutes.get("/course-detail/:id", authenticateUser, getCourseDetail);
adminRoutes.patch("/update-course/:id", authenticateUser, updateCourse);
adminRoutes.delete("/delete-course/:id", authenticateUser, deleteCourse);

adminRoutes.post("/create-module", authenticateUser, createModule);
adminRoutes.get("/module-list", authenticateUser, getModuleList);
adminRoutes.get("/module-detail/:id", authenticateUser, getModuleDetail);
adminRoutes.patch("/module-update/:id", authenticateUser, updateModule);
adminRoutes.delete("/module-delete/:id", authenticateUser, deleteModule);

adminRoutes.post("/create-lecture", authenticateUser, createLecture);
adminRoutes.get("/lecture-list", authenticateUser, getLectureList);
adminRoutes.get("/lecture-detail/:id", authenticateUser, getLectureDetail);
adminRoutes.patch("/lecture-update/:id", authenticateUser, updateLecture);
adminRoutes.delete("/lecture-delete/:id", authenticateUser, deleteLecture);

export default adminRoutes;
