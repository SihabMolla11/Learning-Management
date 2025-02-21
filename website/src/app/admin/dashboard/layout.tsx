import React from "react";
import SideBar from "./components/SideBar";
import { IoMdMenu } from "react-icons/io";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <SideBar>
        <div className="flex-1  flex flex-col overflow-hidden">


          <div className="">{children}</div>
        </div>
      </SideBar>
    </>
  );
};

export default DashboardLayout;
