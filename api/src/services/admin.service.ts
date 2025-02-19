import Course from "../models/course.model";
import { validateRequiredFields } from "../utils/validation.util";

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
