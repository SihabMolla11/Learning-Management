"use client";

import React, { useState } from "react";

import { FaPlus } from "react-icons/fa";
import AdminHeader from "../components/AdminHeader";
import AddCourseModal from "./AddCourseModal";

const ManageCoursePageComponent = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

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
        this is course list page
      </div>

      <AddCourseModal isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
    </>
  );
};

export default ManageCoursePageComponent;
