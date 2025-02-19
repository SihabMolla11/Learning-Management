import { createCourse } from "../controllers/admin.controller";
import express, { Request, RequestHandler, Response } from "express";

const adminRoutes = express.Router();


const createCourseHandler: RequestHandler = async (req: Request, res: Response) => {
  await createCourse(req, res);
};

adminRoutes.post("/createCourse", createCourseHandler);

export default adminRoutes;
