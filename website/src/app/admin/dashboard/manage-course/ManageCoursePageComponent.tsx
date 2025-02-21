"use client";

import { useState } from "react";

import DeleteModal from "@/components/DeleteModal";
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
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [editItem, setEditItem] = useState<CourseDataType | null>(null);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const {
    data: fetchedData,
    isLoading,
    isError,
    refetch,
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

  const handelOpenEdit = (item: CourseDataType) => {
    setEditItem(item);
    setIsOpenModal(true);
  };

  return (
    <>
      <div>
        <AdminHeader pageTitle="Course Management" rightButton={openModalButton} />
        <table className="w-full  divide-gray-200 overflow-x-auto">
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
              <CourseTableCard
                setDeleteItemId={setDeleteItemId}
                setIsOpenDeleteModal={setIsOpenDeleteModal}
                handelOpenEdit={handelOpenEdit}
                key={item?._id}
                data={item}
              />
            ))}
          </tbody>
        </table>
      </div>

      <AddCourseModal
        refetch={refetch}
        editItem={editItem}
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
      />

      <DeleteModal
        isOpen={isOpenDeleteModal}
        setIsOpen={setIsOpenDeleteModal}
        refetch={refetch}
        url={`${API_COURSE.delete}/${deleteItemId}`}
      />
    </>
  );
};

export default ManageCoursePageComponent;
