"use client";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Attend from "./Attend";
import CameraView from "@/Components/slider/CameraView";
import { RootState } from "@/Redux/Store";
import { useSelector } from "react-redux";

interface LiveTestFormProps {
  setTest: React.Dispatch<React.SetStateAction<any>>;
}

const Wrapper: React.FC<LiveTestFormProps> = ({ setTest }) => {
  const test = useSelector((state: RootState) => state.attend);
  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth < 600) {
        setMobileView(true);
      } else {
        setMobileView(false);
      }
    };

    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  return (
    <>
      <div className="w-100 d-flex justify-content-between align-items-center flex-row bg-primary m-0 p-0">
        <Header mobileView={mobileView} />
        <div
          className="d-flex justify-content-center align-items-center flex-row gap-2 p-2"
          style={{}}
        >
          {!mobileView && (
            <p className="w-fit p-0 m-0 d-flex flex-row justify-content-start fs-4 align-items-center gap-3">
              <b>{test.category}</b>
            </p>
          )}

          <div className="">
            <CameraView />
          </div>
        </div>
      </div>
      <Attend setTest={setTest} />
    </>
  );
};

export default Wrapper;
