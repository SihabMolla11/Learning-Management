import { Request, Response } from "express";
import { createCourseService } from "../services/admin.service";

export const createCourse = async (req: Request, res: Response): Promise<Response> => {
  try {
    const response = await createCourseService(req.body);
    return res.status(201).json(response);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};
