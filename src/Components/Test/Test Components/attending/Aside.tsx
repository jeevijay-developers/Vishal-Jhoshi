import React, { memo } from "react";
// import { Info } from "react-feather";
import { IoMdClose } from "react-icons/io";
import SubjectButtons from "./SubjectButtons";
import Info from "./Info";

type Props = {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
  settestCounter: React.Dispatch<React.SetStateAction<number>>;
};

const Aside: React.FC<Props> = ({
  toggleSidebar,
  sidebarOpen,
  settestCounter,
}) => {
  // const toggleSidebar = () => {
  //   setSidebarOpen(!sidebarOpen);
  // };

  return (
    <>
      <aside
        className={`sidebar position-fixed top-0 end-0 h-100 bg-white shadow p-3 transition-all ${
          sidebarOpen ? "show" : "hide"
        }`}
        style={{
          width: "300px",
          transform: sidebarOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease-in-out",
          zIndex: 1000,
          borderLeft: "1px solid #dee2e6",
          overflowY: "auto",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="m-0">Test Information</h5>
          <button
            className="btn btn-sm btn-outline-dark"
            onClick={toggleSidebar}
            aria-label="Close sidebar"
          >
            <IoMdClose size={18} />
          </button>
        </div>
        <Info />
        <SubjectButtons settestCounter={settestCounter} />
      </aside>
      {sidebarOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 999,
          }}
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default memo(Aside) as typeof Aside;
