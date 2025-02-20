import Lecture from "../../models/lecture.model";
import { validateRequiredFields } from "../../utils/validation.util";

export const createLectureService = async (lectureData: any) => {
  const requiredFields = [
    "course_id",
    "module_id",
    "title",
    "slug",
    "video",
    "lecture_number",
    "pdf",
  ];
  validateRequiredFields(lectureData, requiredFields);

  const newLecture = new Lecture(lectureData);
  const savedLecture = await newLecture.save();
  return savedLecture;
};

export const getLectureListService = async (page: number, perPage: number) => {
  const skip = (page - 1) * perPage;
  const lectureList = await Lecture.find()
    .select("_id title slug lecture_number")
    .skip(skip)
    .limit(perPage)
    .exec();

  const totalLectures = await Lecture.countDocuments();
  return {
    lectureList,
    totalLectures,
    totalPages: Math.ceil(totalLectures / perPage),
    currentPage: page,
  };
};

export const getLectureDetailService = async (id: string) => {
  const lecture = await Lecture.findById(id);
  if (!lecture) {
    throw new Error("Lecture not found");
  }
  return lecture;
};

export const updateLectureService = async (id: string, payload: any) => {
  const lecture = await Lecture.findById(id);
  if (!lecture) {
    throw new Error("Lecture not found");
  }

  const updatedLecture = await Lecture.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true, runValidators: true }
  );

  if (!updatedLecture) {
    throw new Error("Something went wrong. Please try again.");
  }

  return updatedLecture;
};

export const deleteLectureService = async (id: string) => {
  const lecture = await Lecture.findById(id);
  if (!lecture) {
    throw new Error("Lecture not found");
  }

  const deletedLecture = await Lecture.findByIdAndDelete(id);
  if (!deletedLecture) {
    throw new Error("Something went wrong. Please try again.");
  }

  return {
    message: "Lecture deleted successfully",
    title: lecture.title,
  };
};

export const lectureListByCourseService = async (
  courseId: string,
  page: number,
  perPage: number
) => {
  const skip = (page - 1) * perPage;
  const lectureList = await Lecture.find({ course_id: courseId })
    .select("_id title slug lecture_number")
    .skip(skip)
    .limit(perPage)
    .exec();

  const totalLectures = await Lecture.countDocuments({ course_id: courseId });
  return {
    lectureList,
    totalLectures,
    totalPages: Math.ceil(totalLectures / perPage),
    currentPage: page,
  };
};

export const lectureByModuleService = async (moduleId: string, page: number, perPage: number) => {
  const skip = (page - 1) * perPage;
  const lectureList = await Lecture.find({ module_id: moduleId })
    .select("_id title slug lecture_number")
    .skip(skip)
    .limit(perPage)
    .exec();

  const totalLectures = await Lecture.countDocuments({ module_id: moduleId });
  return {
    lectureList,
    totalLectures,
    totalPages: Math.ceil(totalLectures / perPage),
    currentPage: page,
  };
};
