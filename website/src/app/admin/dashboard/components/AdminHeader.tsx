"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { sidebarItems } from "./sidebarItems";

const AdminHeader = ({ pageTitle , rightButton}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        ref={sidebarRef}
        className={`fixed bg-gray-800 text-white w-56 min-h-screen overflow-y-auto transition-transform transform ease-in-out duration-300  ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          <button className="text-white hover:text-indigo-400 mb-4" onClick={toggleSidebar}>
            Close
          </button>
          <h1 className="text-2xl font-semibold">Sidebar</h1>
          <ul className="mt-4">
            {sidebarItems?.map((item) => (
              <li key={item.key} className="mb-2">
                <Link href={item.key} className=" hover:text-indigo-400 flex items-center gap-2">
                  {item.icon} {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white shadow">
        <div className="container mx-auto">
          <div className="flex justify-between items-center py-4 px-2">
            <h1 className="text-xl font-semibold">{pageTitle}</h1>

            {rightButton}

            <button
              className="text-gray-500 block lg:hidden hover:text-gray-600"
              onClick={toggleSidebar}
              id="open-sidebar"
            >
              <IoMdMenu className="size-7" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHeader;
