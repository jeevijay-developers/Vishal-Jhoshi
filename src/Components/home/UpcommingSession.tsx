import React from "react";
import { FaRegCalendarDays } from "react-icons/fa6";
import { CiClock2 } from "react-icons/ci";
import { CiBullhorn } from "react-icons/ci";
const UpcommingSession = () => {
  return (
    <div>
      <div className="d-flex">
        <div
          className="d-flex flex-row justify-content-center align-items-center bg-white py-3 position-relative"
          style={{
            maxWidth: "450px",
            minWidth: "400px",
            borderRadius: "20px",
            border: "6px solid #fec001",
            width: "fit-content",
          }}
        >
          <div
            className="bg-primary rounded-circle position-absolute d-flex justify-content-between align-items-center  w-fit"
            style={{
              width: "150px",
              height: "150px",
              border: "6px solid #fec001",
              transform: "translate(-30%, 80%)",
              top: "-140px",
              left: "0px",
            }}
          >
            <div className="w-fit d-flex justify-content-center align-items-center w-100 position-absolute">
              {/* <div className="w-fit d-flex position-absolute">
                <CiBullhorn
                  style={{
                    color: "white",
                    fontSize: "50px",
                    top: " 15px",
                    right: "25px",
                    transform: "rotate(-16deg)",
                    zIndex: "34",
                  }}
                />
              </div> */}
              <CiClock2
                style={{
                  color: "white",
                  fontSize: "100px",
                }}
              />
            </div>
          </div>

          <div
            className="h-100 bg-white text-white"
            style={{
              width: "30%",
            }}
          >
            sdfsfdfs
          </div>
          <div
            className=" h-100"
            style={{
              width: "70%",
            }}
          >
            <p className="m-0 p-0 fw-bold fs-3 " style={{ color: "#000000a8" }}>
              Upcomming
            </p>
            <p className="m-0 p-0 fw-bold text-primary fs-3">
              Mentorship session
            </p>
            <div className="d-flex justify-content-start flex-row gap-2 align-items-center">
              <FaRegCalendarDays
                style={{
                  fontSize: "xx-large",
                  color: "#fec001",
                }}
              />
              <div>
                <p className="m-0 p-0 fw-bold " style={{ color: "#000000a8" }}>
                  Date: {new Date().toLocaleDateString()}
                </p>
                <p className="m-0 p-0 fw-bold " style={{ color: "#000000a8" }}>
                  Time: {"09:30 PM"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcommingSession;
