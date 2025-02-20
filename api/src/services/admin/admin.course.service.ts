import Course from "../../models/course.model";
import { validateRequiredFields } from "../../utils/validation.util";

export const createCourseService = async (courseData: any) => {
  const requiredFields = [
    "thumbnail",
    "title",
    "price",
    "course_duration",
    "start_time",
    "end_time",
    "enrolment_start_date",
    "enrolment_end_date",
  ];

  validateRequiredFields(courseData, requiredFields);

  const newCourse = new Course(courseData);

  const savedCourse = await newCourse.save();
  return savedCourse;
};

export const getCourseListService = async ({
  page,
  perPage,
}: {
  page: number;
  perPage: number;
}) => {
  const skip = (page - 1) * perPage;
  const courseList = await Course.find()
    .select("_id slug thumbnail title price course_duration start_time end_time")
    .skip(skip)
    .limit(perPage)
    .exec();

  const totalCourses = await Course.countDocuments();
  return {
    courseList,
    totalCourses,
    totalPages: Math.ceil(totalCourses / perPage),
    currentPage: page,
  };
};

export const getCourseDetailService = async (id: string) => {
  const course = await Course.findById(id);
  if (!course) {
    throw new Error("Course not found");
  }
  return course;
};

export const updateCourseService = async (id: string, payload: any) => {
  const course = await Course.findById(id);
  if (!course) {
    throw new Error("Course not found");
  }

  const updatedCourse = await Course.findByIdAndUpdate(
    course?._id,
    { $set: payload },
    { new: true, runValidators: true }
  );

  if (updatedCourse) {
    return updatedCourse;
  }

  return updatedCourse;
};

export const deleteCourseService = async (id: string) => {
  const course = await Course.findById(id);
  if (!course) {
    throw new Error("Course not found");
  }

  const deletedCourse = await Course.findByIdAndDelete(course?._id);

  if (!deletedCourse) {
    throw new Error("Something went wrong. Please try again.");
  }

  return {
    message: "Course deleted successfully",
    title: course?.title,
  };
};
