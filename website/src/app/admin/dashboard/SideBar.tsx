"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FiHome } from "react-icons/fi";
import { IoMdMenu } from "react-icons/io";

const SideBar = ({ children }) => {
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

  const sidebarItems = [
    {
      label: "Home",
      key: "/",
      icon: <FiHome />,
    },
  ];

  return (
    <>
      <div className="bg-gray-100">
        <div className=" flex overflow-hidden bg-gray-200 min-h-[calc(100vh-56px)] ">
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
                    <Link
                      href={item.key}
                      className=" hover:text-indigo-400 flex items-center gap-2"
                    >
                      {item.icon} {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-start w-full">
            <div
              className={` hidden lg:block bg-gray-800 text-white max-w-56 min-h-[calc(100vh-56px)]   overflow-y-auto transition-transform transform ease-in-out duration-300  translate-x-0 w-[20%]`}
            >
              <div className="p-4">
                <Link href="#" className="text-2xl font-semibold">
                  Learning Portal
                </Link>
                <ul className="mt-4">
                  {sidebarItems?.map((item) => (
                    <li key={item.key} className="mb-2">
                      <Link
                        href={item.key}
                        className=" hover:text-indigo-400 flex items-center gap-2"
                      >
                        {item.icon} {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex-1  flex flex-col overflow-hidden">
              <div className="bg-white shadow">
                <div className="container mx-auto">
                  <div className="flex justify-between items-center py-4 px-2">
                    <h1 className="text-xl font-semibold">Animated Drawer</h1>
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

              <div className="">{children}</div>
            </div>
          </div>
        </div>
        <div className="bg-primary py-4 text-gray-100 mt-auto">
          <p className="px-4 text-center sm:w-auto w-full">
            © 2025 - Sihab Uddin Molla. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default SideBar;
