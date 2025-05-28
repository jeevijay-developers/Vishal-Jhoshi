"use client";
import React from "react";
import DsbSidebar from "./DsbSidebar";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

import dynamic from "next/dynamic";
const BootstrapBundle = dynamic(
  () => import("bootstrap/dist/js/bootstrap.bundle.min.js"),
  { ssr: false }
);
import StudentMain from "./StudentMain";
import { useSelector } from "react-redux";
import AdminSidebar from "./admin/AdminSidebar";
import AdminMain from "./admin/AdminMain";

const DashboardWrapper = () => {
  const [show, setShow] = React.useState("PROFILE");
  const user = useSelector((state: any) => state.user);
  console.log(user);
  React.useEffect(() => {
    BootstrapBundle;
  }, []);

  return (
    <div className="container-fluid">
      {user.role === "admin" ? (
        <div className="row">
          <AdminSidebar show={show} setShow={setShow} />
          <AdminMain show={show} setShow={setShow} />
        </div>
      ) : (
        <div className="row">
          <DsbSidebar show={show} setShow={setShow} />
          <StudentMain show={show} setShow={setShow} />
        </div>
      )}
    </div>
  );
};

export default DashboardWrapper;
