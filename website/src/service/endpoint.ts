import { CLOUDINARY } from "@/lib/constant";

export const API_CLOUDINARY_IMAGE_UPLOAD = `https://api.cloudinary.com/v1_1/${CLOUDINARY.name}/image/upload`;

export const API_REGISTRATION_USER = "user/auth/signUp";
export const API_LOGIN_USER = "user/auth/signIn";

export const API_COURSE = {
  create: "admin-dashboard/create-course",
  getList: "admin-dashboard/course-list",
  update: "admin-dashboard/update-course",
  delete: "admin-dashboard/delete-course",
};
