import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { signOut } from "next-auth/react";

type Props = {
  show: string;
  setShow: React.Dispatch<React.SetStateAction<string>>;
};

const DsbSidebar: React.FC<Props> = ({ show, setShow }) => {
  return (
    <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary text-black">
      <div
        className="offcanvas-md offcanvas-end bg-body-tertiary"
        tabIndex={-1}
        id="sidebarMenu"
        aria-labelledby="sidebarMenuLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="sidebarMenuLabel">
            Profile
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            data-bs-target="#sidebarMenu"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
          <ul className="nav flex-column">
            <li className="nav-item" onClick={() => setShow("PROFILE")}>
              <a
                className={`nav-link d-flex align-items-center gap-2 ${
                  show === "PROFILE" ? "active bg-white" : ""
                } active text-primary`}
                aria-current="page"
                href="#"
              >
                <i className="bi bi-house-fill"></i>
                Profile
              </a>
            </li>
            <li className="nav-item" onClick={() => setShow("TEST_RESULT")}>
              <a
                className={`nav-link d-flex align-items-center gap-2 ${
                  show === "TEST_RESULT" ? "active bg-white" : ""
                } active text-primary`}
                aria-current="page"
                href="#"
              >
                <i className="bi bi-file-earmark"></i>
                Test Result
              </a>
            </li>
            <li className="nav-item" onClick={() => setShow("MENTOR_LIST")}>
              <a
                className={`nav-link d-flex align-items-center gap-2 ${
                  show === "MENTOR_LIST" ? "active bg-white" : ""
                } active text-primary`}
                aria-current="page"
                href="#"
              >
                <i className="bi bi-people"></i>
                Mentor List
              </a>
            </li>
            <li className="nav-item" onClick={() => setShow("SCORE_GRAPH")}>
              <a
                className={`nav-link d-flex align-items-center gap-2 ${
                  show === "SCORE_GRAPH" ? "active bg-white" : ""
                } active text-primary`}
                aria-current="page"
                href="#"
              >
                <i className="bi bi-graph-up"></i>
                Score graph
              </a>
            </li>
            <li
              className="nav-item"
              onClick={() => setShow("STUDY_REPORT_GRAPH")}
            >
              <a
                className={`nav-link d-flex align-items-center gap-2 ${
                  show === "STUDY_REPORT_GRAPH" ? "active bg-white" : ""
                } active text-primary`}
                aria-current="page"
                href="#"
              >
                <i className="bi bi-graph-up"></i>
                Study report graph
              </a>
            </li>
          </ul>

          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
            <span>Saved reports</span>
            <a
              className="link-secondary"
              href="#"
              aria-label="Add a new report"
            >
              <i className="bi bi-plus-circle"></i>
            </a>
          </h6>

          <ul className="nav flex-column mb-auto">
            <li className="nav-item" onClick={() => setShow("TEST_PAPERS")}>
              <a
                className={`nav-link d-flex align-items-center gap-2 ${
                  show === "TEST_PAPERS" ? "active bg-white" : ""
                } active text-primary`}
                aria-current="page"
                href="#"
              >
                <i className="bi bi-file-earmark-text"></i>
                Test Papers
              </a>
            </li>
            <li className="nav-item" onClick={() => setShow("REATTEND_TEST")}>
              <a
                className={`nav-link d-flex align-items-center gap-2 ${
                  show === "REATTEND_TEST" ? "active bg-white" : ""
                } active text-primary`}
                aria-current="page"
                href="#"
              >
                <i className="bi bi-file-earmark-text"></i>
                Reattend test
              </a>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">
                <i className="bi bi-file-earmark-text"></i>
                Social engagement
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">
                <i className="bi bi-file-earmark-text"></i>
                Year-end sale
              </a>
            </li> */}
          </ul>

          <hr className="my-3" />

          <ul className="nav flex-column mb-auto">
            {/* <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">
                <i className="bi bi-gear-wide-connected"></i>
                Settings
              </a>
            </li> */}
            <li className="nav-item mx-auto">
              <button
                className="btn btn-danger"
                onClick={() => {
                  signOut();
                }}
              >
                <i className="bi bi-door-closed"></i>
                Sign out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DsbSidebar;
