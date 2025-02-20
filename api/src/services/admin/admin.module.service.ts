import Module from "../../models/module.model";
import { validateRequiredFields } from "../../utils/validation.util";

export const createModuleService = async (moduleData: any) => {
  const requiredFields = ["title", "module_number", "course_id", "slug"];
  validateRequiredFields(moduleData, requiredFields);

  const newModule = new Module(moduleData);
  const savedModule = await newModule.save();
  return savedModule;
};

// export const getModulesByCourseIdService = async (courseId: string) => {
//   const modules = await Module.find({ course_id: courseId });
//   return modules;
// };

export const getModuleListService = async (page: number, perPage: number) => {
  const skip = (page - 1) * perPage;
  const moduleList = await Module.find()
    .select("_id slug title module_number")
    .skip(skip)
    .limit(perPage)
    .exec();

  const totalModule = await Module.countDocuments();
  return {
    moduleList,
    totalModule,
    totalPages: Math.ceil(totalModule / perPage),
    currentPage: page,
  };
};

export const getModuleDetailService = async (id: string) => {
  const module = await Module.findById(id);
  if (!module) {
    throw new Error("Module not found");
  }
  return module;
};

export const updateModuleService = async (id: string, payload: any) => {
  const module = await Module.findById(id);
  if (!module) {
    throw new Error("Module not found");
  }

  const updatedModule = await Module.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true, runValidators: true }
  );

  if (!updatedModule) {
    throw new Error("Something went wrong. Please try again.");
  }

  return updatedModule;
};

export const deleteModuleService = async (id: string) => {
  const findModule = await Module.findById(id);
  if (!findModule) {
    throw new Error("Module not found");
  }

  const deletedModule = await Module.findByIdAndDelete(findModule?._id);
  if (!deletedModule) {
    throw new Error("Something went wrong. Please try again.");
  }

  return {
    message: "Module deleted successfully",
    title: findModule?.title,
  };
};
