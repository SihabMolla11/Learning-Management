import React from "react";
import SideBar from "./SideBar";

const DashboardLayout = ({ children }) => {
  return (
    <>
      <SideBar>{children}</SideBar>
    </>
  );
};

export default DashboardLayout;
