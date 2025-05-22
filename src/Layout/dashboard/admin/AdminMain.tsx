import React from "react";
import UserProfile from "../DsbProfile";
import TestCardWrapper from "../test/TestCardWrapper";
import MentorCardGrid from "../mentor/MentorCardGrid";
import TestScoreGraph from "../test/TestScoreGraph";
import TestInfoGrid from "../test/TestInfoGrid";
import StudySessionGraph from "../test/StudySessionGraph";
import ReAttendGrid from "../test/ReAttendGrid";
import ReScheduleGridAdmin from "./ReScheduleGridAdmin";
import CreateQuestionWrapper from "./CreateQuestionWrapper";

type Props = {
  show: string;
  setShow: React.Dispatch<React.SetStateAction<string>>;
};

const AdminMain: React.FC<Props> = ({ show, setShow }) => {
  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Dashboard</h1>
      </div>

      <div className="table-responsive small">
        {show === "PROFILE" && <UserProfile />}
        {show === "TEST_RESULT" && <TestCardWrapper setShow={setShow} />}
        {show === "MENTOR_LIST" && <MentorCardGrid />}
        {show === "SCORE_GRAPH" && <TestScoreGraph />}
        {show === "TEST_PAPERS" && <TestInfoGrid />}
        {show === "STUDY_REPORT_GRAPH" && <StudySessionGraph />}
        {show === "REATTEND_TEST" && <ReScheduleGridAdmin />}
        {show === "CREATE_QUESTION" && <CreateQuestionWrapper />}
      </div>
    </main>
  );
};

export default AdminMain;
