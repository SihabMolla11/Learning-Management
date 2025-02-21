import React from "react";
import SideBar from "./SideBar";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <SideBar>{children}</SideBar>
    </>
  );
};

export default DashboardLayout;
