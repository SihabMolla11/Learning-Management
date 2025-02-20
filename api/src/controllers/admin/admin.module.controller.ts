import { Request, Response } from "express";
import {
  createModuleService,
  deleteModuleService,
  getModuleDetailService,
  getModuleListService,
  updateModuleService,
} from "../../services/admin/admin.module.service";
import { checkValidUserService } from "../../services/checkValidUser.service";

export const createModule = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user }: any = req;

    const fendedUser = checkValidUserService(user?.id);
    if (!fendedUser || user?.user_role !== "ADMIN") {
      res.status(401).json({ error: "Unauthorized User" });
      return;
    }

    const response = await createModuleService(req.body);
    res.status(201).json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

export const getModuleList = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user }: any = req;
    const { page, perPage }: any = req.query;

    const fendedUser = checkValidUserService(user?.id);
    if (!fendedUser || user?.user_role !== "ADMIN") {
      res.status(401).json({ error: "Unauthorized User" });
      return;
    }

    const response = await getModuleListService(+page, +perPage);
    res.status(201).json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

// export const getModulesByCourseId = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { user }: any = req;
//     const { courseId } = req.params;

//     const fendedUser = checkValidUserService(user?.id);
//     if (!fendedUser || user?.user_role !== "ADMIN") {
//       res.status(401).json({ error: "Unauthorized User" });
//       return;
//     }

//     const response = await getModulesByCourseIdService(courseId);
//     res.status(200).json(response);
//   } catch (error: any) {
//     res.status(500).json({ error: error.message || "Internal Server Error" });
//   }
// };

export const getModuleDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user }: any = req;
    const { id } = req.params;

    const fendedUser = checkValidUserService(user?.id);
    if (!fendedUser || user?.user_role !== "ADMIN") {
      res.status(401).json({ error: "Unauthorized User" });
      return;
    }

    const response = await getModuleDetailService(id);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

export const updateModule = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user }: any = req;
    const { id } = req.params;

    const fendedUser = checkValidUserService(user?.id);
    if (!fendedUser || user?.user_role !== "ADMIN") {
      res.status(401).json({ error: "Unauthorized User" });
      return;
    }

    const response = await updateModuleService(id, req.body);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

export const deleteModule = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user }: any = req;
    const { id } = req.params;

    const fendedUser = checkValidUserService(user?.id);
    if (!fendedUser || user?.user_role !== "ADMIN") {
      res.status(401).json({ error: "Unauthorized User" });
      return;
    }

    const response = await deleteModuleService(id);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};
