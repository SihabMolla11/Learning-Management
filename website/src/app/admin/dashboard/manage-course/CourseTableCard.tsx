import React from "react";
import { CourseDataType } from "./course.types";

type PropsTypes = {
  data: CourseDataType;
};

const CourseTableCard: React.FC<PropsTypes> = ({ data }) => {
  return (
    <>
      <tr>
        <td className="px-6 py-4 whitespace-nowrap">
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
        <td className="px-6 py-4 whitespace-nowrap">
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

          <div className="pt-2">
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
        <td className="px-6 py-4 whitespace-nowrap">
          <p className="text-sm text-gray-500">{`${data?.description}`}</p>
        </td>

        <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
          <a href="#" className="text-indigo-600 hover:text-indigo-900">
            Edit
          </a>
          <a href="#" className="ml-2 text-red-600 hover:text-red-900">
            Delete
          </a>
        </td>
      </tr>
    </>
  );
};

export default CourseTableCard;
