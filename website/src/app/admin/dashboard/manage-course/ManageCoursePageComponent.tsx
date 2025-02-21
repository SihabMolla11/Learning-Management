"use client";

import { useState } from "react";

import { get } from "@/service/api";
import { API_COURSE } from "@/service/endpoint";
import { useQuery } from "@tanstack/react-query";
import { FaPlus } from "react-icons/fa";
import AdminHeader from "../components/AdminHeader";
import AddCourseModal from "./AddCourseModal";
import CourseTableCard from "./CourseTableCard";
import { CourseDataType } from "./course.types";

const ManageCoursePageComponent = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const {
    data: fetchedData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["get-all-course-for-admin"],
    queryFn: () => get(API_COURSE.getList),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  const openModalButton = (
    <>
      <button className="btn-primary " onClick={() => setIsOpenModal(true)}>
        <FaPlus />
        Add New
      </button>
    </>
  );

  return (
    <>
      <div>
        <AdminHeader pageTitle="Course Management" rightButton={openModalButton} />
        <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Course
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Times
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Description
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {fetchedData?.courseList?.map((item: CourseDataType) => (
              <CourseTableCard key={item?._id} data={item} />
            ))}
          </tbody>
        </table>
      </div>

      <AddCourseModal isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
    </>
  );
};

export default ManageCoursePageComponent;
