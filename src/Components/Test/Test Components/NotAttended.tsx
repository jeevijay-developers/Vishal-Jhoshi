import React from "react";
import style from "./NotAttended.module.css";

const NotAttended = ({ message }: { message: string }) => {
  return (
    <div
      className={`d-flex w-100 h-100 flex-column justify-content-center align-items-center`}
      style={{
        alignItems: "center !important",
      }}
    >
      <img
        className={`${style.w35} m-auto`}
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/notAttendedyet.jpg`}
        alt="alter image"
      />
      <h3 className="m-auto">{message}</h3>
    </div>
  );
};

export default NotAttended;
