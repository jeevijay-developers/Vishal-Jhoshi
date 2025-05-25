import { RootState } from "@/Redux/Store";
import { getAttendedTest } from "@/server/tests";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = {
  setShowSubmission: React.Dispatch<React.SetStateAction<boolean>>;
  submitTest: () => void;
};
const TestSubmissionPage: React.FC<Props> = ({
  setShowSubmission,
  submitTest,
}) => {
  const test = useSelector((state: RootState) => state.attend);
  const user = useSelector((state: any) => state.user);
  const questions = useSelector((state: RootState) => state.answer.questions);
  // console.log(test);
  const [testStats, setTestStats] = useState({
    startTime: "",
    endTime: "",
    totalQuestions: 0,
    attendedQuestions: 0,
    category: "",
    testName: "",
  });
  // alert(":");
  console.log(questions);

  // get the test analytics
  useEffect(() => {
    getAttendedTest(test._id, user._id)
      .then((data) => {
        // console.log(data?.data);
        // getting the answerd and unanswered questions
        const correctCount = questions.filter(
          (t) => t.questionStatus === "CORRECT"
        ).length;
        const incorrectCount = questions.filter(
          (t) => t.questionStatus === "INCORRECT"
        ).length;
        setTestStats({
          startTime: data?.data?.startTime?.split(" ")[0] || "",
          endTime: data?.data?.endTime?.split(" ")[0] || "",
          totalQuestions: data?.data?.liveTestId?.Questions?.length || 0,
          attendedQuestions: correctCount + incorrectCount,
          category: data?.data?.liveTestId?.category || "",
          testName: data?.data?.liveTestId?.testName || "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [questions]);

  // console.log(testStats);

  return (
    <div
      className="container my-4 d-flex justify-content-center"
      style={{
        position: "absolute",
        top: "0%",
        height: "100vh",
        width: "100vw",
        left: "5%",
        background: "#308e8721",
        backdropFilter: "blur(4px)",
        borderRadius: "20px",
      }}
    >
      <div
        className="card shadow-lg border-0 w-100"
        style={{ maxWidth: "600px" }}
      >
        <div className="card-body">
          <h5 className="card-title text-primary fw-bold mb-3">
            🧾 Test Summary
          </h5>
          <ul className="list-group list-group-flush text-start">
            <li className="list-group-item">
              <strong>Test Name:</strong> {testStats.testName || "N/A"}
            </li>
            <li className="list-group-item">
              <strong>Category:</strong> {testStats.category || "N/A"}
            </li>
            <li className="list-group-item">
              <strong>Start Time:</strong> {testStats.startTime || "N/A"}
            </li>
            <li className="list-group-item">
              <strong>End Time:</strong> {testStats.endTime || "N/A"}
            </li>
            <li className="list-group-item">
              <strong>Total Questions:</strong> {testStats.totalQuestions}
            </li>
            <li className="list-group-item">
              <strong>Attended Questions:</strong> {testStats.attendedQuestions}
            </li>
          </ul>
          <div className="d-flex justify-content-end flex-row gap-3">
            <button
              onClick={() => setShowSubmission(false)}
              className="btn btn-danger"
            >
              Close
            </button>
            <button
              onClick={() => {
                setShowSubmission(false);
                submitTest();
              }}
              className="btn btn-primary"
            >
              Submit Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestSubmissionPage;
