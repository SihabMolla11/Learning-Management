import React, { useState } from "react";
import { CourseDataType } from "./course.types";

type PropsTypes = {
  data: CourseDataType;
  handelOpenEdit: (data: CourseDataType) => void;
  setDeleteItemId: (data: string) => void;
  setIsOpenDeleteModal: (data: boolean) => void;
};

const CourseTableCard: React.FC<PropsTypes> = ({
  data,
  handelOpenEdit,
  setDeleteItemId,
  setIsOpenDeleteModal,
}) => {
  const [showAll, setShowAll] = useState(false);

  const descriptionText =
    data?.description?.length > 200 ? (
      <p className="text-sm text-gray-500">
        {`${!showAll ? data?.description?.slice(0, 200) : data?.description}`}
        <button onClick={() => setShowAll(!showAll)} className="text-primary hover:underline ms-2">
          {showAll ? "see less" : "see more..."}
        </button>
      </p>
    ) : (
      <p className="text-sm text-gray-500">{data?.description}</p>
    );

  const handelDeleteClick = () => {
    setDeleteItemId(data?._id);
    setIsOpenDeleteModal(true);
  };

  return (
    <>
      <tr>
        <td className="px-6 whitespace-nowrap py-2 align-top">
          <div className="flex items-start">
            <div className="flex-shrink-0 h-10 w-10">
              <img
                height={40}
                width={40}
                className="h-10 w-10 rounded-sm border border-primary-hover"
                src={data?.thumbnail ?? "https://i.pravatar.cc/150?img=1"}
                alt="learning portal"
              />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900">{data?.title}</p>
              <p className=" text-primary font-semibold">
                Price: <span>{data?.price ?? "00"}BDT</span>
              </p>
              <p className="text-sm text-gray-900">
                Course Duration
                <span className="font-semibold text-black ms-2">{data?.course_duration}</span>
              </p>
            </div>
          </div>
        </td>
        <td className="px-6 whitespace-nowrap py-2 align-top">
          <div className="border-b border-gray-color pb-2">
            <p className="text-sm text-gray-900">
              Start Date:
              <span className="font-semibold text-black ms-2">
                {new Date(data?.start_time)?.toDateString()}
              </span>
            </p>
            <p className="text-sm text-gray-900">
              End Date:
              <span className="font-semibold text-black ms-2">
                {new Date(data?.end_time)?.toDateString()}
              </span>
            </p>
          </div>

          <div className="pt-2 ">
            <p className="text-sm text-gray-900">
              Enrollment Start Date:
              <span className="font-semibold text-black ms-2">
                {new Date(data?.enrolment_start_date)?.toDateString()}
              </span>
            </p>
            <p className="text-sm text-gray-900">
              Enrollment End Date:
              <span className="font-semibold text-black ms-2">
                {new Date(data?.enrolment_end_date)?.toDateString()}
              </span>
            </p>
          </div>
        </td>
        <td className="px-6  py-2 align-top">{descriptionText}</td>

        <td className="px-6 whitespace-nowrap py-2  text-sm font-medium align-top">
          <button
            onClick={() => handelOpenEdit(data)}
            className="text-primary hover:text-primary-hover"
          >
            Edit
          </button>
          <button onClick={handelDeleteClick} className="ml-2 text-red-600 hover:text-red-900">
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default CourseTableCard;
