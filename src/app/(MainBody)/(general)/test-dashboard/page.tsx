"use client";
import dynamic from "next/dynamic";
const DashboardWrapper = dynamic(
  () => import("@/Layout/dashboard/DashboardWrapper"),
  { ssr: false }
);
const DasbBoardHeader = dynamic(
  () => import("@/Layout/dashboard/DasbBoardHeader"),
  { ssr: false }
);
// import DasbBoardHeader from "../../../../Layout/dashboard/DasbBoardHeader";
// import DashboardWrapper from "../../../../Layout/dashboard/DashboardWrapper";
import React from "react";

const page = () => {
  return (
    <div className="p-0 m-0">
      <DasbBoardHeader />
      <DashboardWrapper />
    </div>
  );
};

export default page;
