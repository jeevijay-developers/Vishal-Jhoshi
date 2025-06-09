"use client";
import React, { useState } from "react";
import UploadHomeworkForm from "./UploadHomeworkForm";
import { useSelector } from "react-redux";
import Homeworks from "./Homeworks";

const HomeWorkWrapper = () => {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const USER = useSelector((state: any) => state.user);
  return (
    <div>
      {USER.role === "admin" && (
        <button
          className="btn btn-outline-primary mx-3 my-3"
          onClick={() => setOpenForm(true)}
        >
          Add New Homework
        </button>
      )}
      {openForm && (
        <div className="position-relative">
          <UploadHomeworkForm setOpenForm={setOpenForm} />
        </div>
      )}
      <div>
        <Homeworks />
      </div>
    </div>
  );
};

export default HomeWorkWrapper;
