import { Request, Response } from "express";
import {
  createLectureService,
  deleteLectureService,
  getLectureDetailService,
  getLectureListService,
  updateLectureService,
} from "../../services/admin/admin.lecture.service";
import { checkValidUserService } from "../../services/checkValidUser.service";

export const createLecture = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user }: any = req;

    const fendedUser = checkValidUserService(user?.id);
    if (!fendedUser || user?.user_role !== "ADMIN") {
      res.status(401).json({ error: "Unauthorized User" });
      return;
    }

    const response = await createLectureService(req.body);
    res.status(201).json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

export const getLectureList = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user }: any = req;
    const { page, perPage }: any = req.query;

    const fendedUser = checkValidUserService(user?.id);
    if (!fendedUser || user?.user_role !== "ADMIN") {
      res.status(401).json({ error: "Unauthorized User" });
      return;
    }

    const response = await getLectureListService(+page, +perPage);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

export const getLectureDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user }: any = req;
    const { id } = req.params;

    const fendedUser = checkValidUserService(user?.id);
    if (!fendedUser || user?.user_role !== "ADMIN") {
      res.status(401).json({ error: "Unauthorized User" });
      return;
    }

    const response = await getLectureDetailService(id);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

export const updateLecture = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user }: any = req;
    const { id } = req.params;

    const fendedUser = checkValidUserService(user?.id);
    if (!fendedUser || user?.user_role !== "ADMIN") {
      res.status(401).json({ error: "Unauthorized User" });
      return;
    }

    const response = await updateLectureService(id, req.body);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

export const deleteLecture = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user }: any = req;
    const { id } = req.params;

    const fendedUser = checkValidUserService(user?.id);
    if (!fendedUser || user?.user_role !== "ADMIN") {
      res.status(401).json({ error: "Unauthorized User" });
      return;
    }

    const response = await deleteLectureService(id);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};
