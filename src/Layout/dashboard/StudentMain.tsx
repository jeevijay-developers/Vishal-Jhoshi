import React from "react";
import UserProfile from "./DsbProfile";
import TestCardWrapper from "./test/TestCardWrapper";
import MentorCardGrid from "./mentor/MentorCardGrid";
import TestScoreGraph from "./test/TestScoreGraph";
import StudySessionGraph from "./test/StudySessionGraph";
import TestInfoCard from "./test/TestInfoCard";
import TestInfoGrid from "./test/TestInfoGrid";
import ReAttendGrid from "./test/ReAttendGrid";
import Result from "@/Components/Test/Test Components/result analysis/Result";

type Props = {
  show: string;
  setShow: React.Dispatch<React.SetStateAction<string>>;
};

const StudentMain: React.FC<Props> = ({ show, setShow }) => {
  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Your Profile</h1>
        {/* <div className="btn-toolbar mb-2 mb-md-0">
              <div className="btn-group me-2">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                >
                  Share
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                >
                  Export
                </button>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center gap-1"
              >
                <i className="bi bi-calendar3"></i>
                This week
              </button>
            </div> */}
      </div>

      <div className="table-responsive small">
        {show === "PROFILE" && <UserProfile />}
        {show === "TEST_RESULT" && <TestCardWrapper setShow={setShow} />}
        {show === "MENTOR_LIST" && <MentorCardGrid />}
        {show === "SCORE_GRAPH" && <TestScoreGraph />}
        {show === "TEST_PAPERS" && <TestInfoGrid />}
        {show === "STUDY_REPORT_GRAPH" && <StudySessionGraph />}
        {show === "REATTEND_TEST" && <ReAttendGrid />}
        {show === "RESULT" && <Result />}
      </div>
    </main>
  );
};

export default StudentMain;
