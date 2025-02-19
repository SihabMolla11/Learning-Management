import { Request, Response } from "express";
import { createCourseService } from "../services/admin.service";
import { checkValidUserService } from "../services/checkValidUser.service";

export const createCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user }: any = req;

    const fendedUser = checkValidUserService(user?.id);
    if (!fendedUser || user?.user_role !== "ADMIN") {
      res.status(401).json({ error: "Usr Not Found" });
    } else {
      const response = await createCourseService(req.body);
      res.status(201).json(response);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};
