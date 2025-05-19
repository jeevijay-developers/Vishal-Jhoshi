import Image from "next/image";
import React from "react";
import UpcommingSession from "./UpcommingSession";

const CallOut = () => {
  return (
    <div className="d-flex gap-3 flex-row justify-content-around flex-wrap align-items-center p-5 bg-white rounded-2">
      <div className="position-relative d-flex flex-column justify-content-center gap-3">
        <Image
          src="/assets/images/home/callout.png"
          alt="sdf"
          className=""
          style={{
            height: "80px",
            width: "auto",
          }}
          width={200}
          height={100}
        />

        <Image
          src="/assets/images/home/chatwithVJ.png"
          alt="sdf"
          className=""
          style={{
            height: "80px",
            width: "auto",
          }}
          width={200}
          height={100}
        />
      </div>
      <div>
        <UpcommingSession />
      </div>
    </div>
  );
};

export default CallOut;
