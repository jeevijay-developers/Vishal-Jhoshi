import { RootState } from "@/Redux/Store";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import IntegerQuestion from "./IntegerQuestion";
import { attendTestNow, getQuestion } from "@/server/tests";
import SelecQuestion from "./SelecQuestion";
import MatchTheColumn from "./MatchTheColumn";
import {
  addQuestion,
  resetQuestions,
  setCurrentQuestion,
  submitTestCompleted,
} from "@/Redux/Reducers/UserAnswers";
import Info from "./Info";
import SubjectButtons from "./SubjectButtons";
import { resetAttending } from "@/Redux/Reducers/AttendStatus";
import { resetAttendFormData } from "@/Redux/Reducers/AttendSlice";
import "./buttonstyles.css";
import { SlMenu } from "react-icons/sl";
import { IoMdClose } from "react-icons/io";
import Aside from "./Aside";
import BooleanQuestion from "./BooleanQuestions";

interface LiveTestFormProps {
  setTest: React.Dispatch<React.SetStateAction<any>>;
}

const Attend: React.FC<LiveTestFormProps> = ({ setTest }) => {
  // question states
  //* Integer question
  const [integerQuestion, setintegerQuestion] = useState({
    subject: "",
    topic: "",
    subtopic: "",
    level: "",
    type: "integer",
    description: "",
    correctAnswer: "",
    marks: null,
    _id: "",
  });
  //* select type question
  const [multiSelectQuestion, setmultiSelectQuestion] = useState({
    subject: "",
    topic: "",
    subtopic: "",
    level: "easy",
    type: "select",
    description: "",
    descriptionImage: "",
    optionType: "text",
    textOptionsA: "",
    textOptionsB: "",
    textOptionsC: "",
    textOptionsD: "",
    imageOptionsA: "",
    imageOptionsB: "",
    imageOptionsC: "",
    imageOptionsD: "",
    correctAnswer: [],
    marks: null,
    _id: "",
  });
  //* match the column
  const [matchTheColumn, setmatchTheColumn] = useState({
    subject: "",
    topic: "",
    subtopic: "",
    level: "",
    type: "match",

    leftOptionsA: "",
    leftOptionsB: "",
    leftOptionsC: "",
    leftOptionsD: "",

    rightOptionsA: "",
    rightOptionsB: "",
    rightOptionsC: "",
    rightOptionsD: "",

    leftImagesA: "",
    leftImagesB: "",
    leftImagesC: "",
    leftImagesD: "",

    rightImagesA: "",
    rightImagesB: "",
    rightImagesC: "",
    rightImagesD: "",

    correctMatchings: [],
    optionType: "",
    description: "",

    // New field for description image
    descriptionImage: "",
    _id: "",
  });

  const [testCounter, settestCounter] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const test = useSelector((state: RootState) => state.attend);
  const user = useSelector((state: any) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    test.Questions.forEach((SingleTest, index) => {
      // console.log(SingleTest);
      const respone = {
        color: "white",
        questionIndex: index,
        questionId: SingleTest.questionId,
        testId: test._id,
        userId: user._id,
        rightAnswer: SingleTest.correctAnswer,
        userAnswer: "null",
        questionStatus: "INIT",
        type: SingleTest.questionType,
        subject: SingleTest.subject,
        marks: 0,
        timeTaken: 0,
      };
      dispatch(addQuestion(respone));
    });

    return () => {
      dispatch(resetAttending());
      dispatch(addQuestion([]));
      dispatch(resetAttendFormData());
      dispatch(resetQuestions());
    };
  }, []);

  const updateIndex = useCallback(
    (action: string) => {
      if (action === "INCREMENT") {
        if (testCounter < test.Questions.length - 1) {
          settestCounter((prev) => prev + 1);
          dispatch(
            setCurrentQuestion(test.Questions[testCounter + 1].questionId)
          );
        } else {
          toast.error("You have reached the last question.", {
            position: "top-center",
          });
        }
      } else if (action === "DECREMENT") {
        if (testCounter > 0) {
          settestCounter((prev) => prev - 1);
          dispatch(
            setCurrentQuestion(test.Questions[testCounter - 1].questionId)
          );
        } else {
          toast.error("You are already at the first question.", {
            position: "top-center",
          });
        }
      }
    },
    [testCounter, test.Questions.length, settestCounter]
  );

  const [loading, setLoadding] = useState(true);

  useEffect(() => {
    setLoadding(true);
    const questionId = test.Questions[testCounter].questionId;
    const type = test.Questions[testCounter].questionType;

    getQuestion(questionId, type)
      .then((data) => {
        console.log(data);

        if (type === "integer" || type === "boolean") {
          setintegerQuestion(data);
        } else if (type === "single_choice" || type === "multiple_choice") {
          setmultiSelectQuestion(data);
        } else {
          setmatchTheColumn(data);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoadding(false);
      });
  }, [testCounter]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  function submitTest() {
    attendTestNow(test._id, user._id);
    dispatch(submitTestCompleted());
    dispatch(resetAttending());
  }

  if (loading) {
    return <div className="text-center p-5">Loading...</div>;
  }

  const renderQuestionComponent = () => {
    const type = test.Questions[testCounter].questionType;
    console.log(type);

    if (type === "integer" || type === "boolean") {
      if (type === "integer") {
        return (
          <IntegerQuestion
            integerQuestion={integerQuestion}
            index={testCounter}
            testId={test._id}
            negativeMarking={Number(integerQuestion?.marks?.correct ?? 0)}
            positiveMarking={Number(integerQuestion?.marks?.incorrect ?? 0)}
            settestCounter={settestCounter}
          />
        );
      } else {
        return (
          <BooleanQuestion
            booleanQuestion={integerQuestion}
            index={testCounter}
            testId={test._id}
            negativeMarking={Number(integerQuestion?.marks?.correct ?? 0)}
            positiveMarking={Number(integerQuestion?.marks?.incorrect ?? 0)}
            settestCounter={settestCounter}
          />
        );
      }
    } else if (type === "single_choice" || type === "multiple_choice") {
      return (
        <SelecQuestion
          selectQuestion={multiSelectQuestion}
          index={testCounter}
          testId={test._id}
          negativeMarking={Number(multiSelectQuestion?.marks?.correct ?? 0)}
          positiveMarking={Number(multiSelectQuestion?.marks?.incorrect ?? 0)}
          settestCounter={settestCounter}
          testCounter={testCounter}
        />
      );
    } else {
      return (
        <MatchTheColumn
          matchTheColumnQuestions={matchTheColumn}
          index={testCounter}
          testId={test._id}
          negativeMarking={Number(test.negativeMarking)}
          positiveMarking={Number(test.positiveMarking)}
          settestCounter={settestCounter}
        />
      );
    }
  };

  return (
    <div className="w-100 bg-white">
      {/* Desktop and Mobile Layout */}
      <div className="bg-white text-dark w-100">
        {/* Desktop Layout */}
        {/* {!isMobile ? ( */}
        <div className="d-flex d-none d-md-flex justify-content-between align-items-start flex-row w-100 p-2 gap-3">
          <div className="question-container" style={{ width: "70%" }}>
            {renderQuestionComponent()}
            <div className="mt-4 d-flex justify-content-center align-items-center gap-4">
              <button
                className="btn btn-info mx-2 timesUp"
                onClick={() => {
                  updateIndex("DECREMENT");
                }}
              >
                Previous
              </button>
              <button
                className="btn btn-info mx-2 timesUp"
                onClick={() => {
                  updateIndex("INCREMENT");
                }}
              >
                Next
              </button>

              <button
                onClick={() => {
                  submitTest();
                  setTest("TEST-LIST");
                }}
                className="btn btn-danger mx-2"
              >
                Submit Test
              </button>
            </div>
          </div>

          {/* Desktop Sidebar - Fixed on page */}
          <aside
            style={{
              borderLeft: "2px solid black",
              width: "30%",
            }}
            className="ps-3 h-100"
          >
            <Info />
            <SubjectButtons settestCounter={settestCounter} />
          </aside>
        </div>
        {/* ) : ( */}
        {/* Mobile Layout */}
        <span className="d-block d-md-none">
          <main className="d-flex flex-column w-100 p-2">
            <div className="d-flex justify-content-end mb-2">
              <button
                className="btn btn-sm btn-outline-dark"
                onClick={toggleSidebar}
                aria-label="Toggle sidebar"
              >
                <SlMenu size={18} />
              </button>
            </div>

            <div className="question-container">
              {renderQuestionComponent()}

              {/*?  here */}
              <div className="mt-4 prevNextSubmitButton  gap-4">
                <button
                  className="btn btn-info mx-2 timesUp"
                  onClick={() => {
                    updateIndex("DECREMENT");
                  }}
                >
                  Previous
                </button>
                <button
                  className="btn btn-info mx-2 timesUp"
                  onClick={() => {
                    updateIndex("INCREMENT");
                  }}
                >
                  Next
                </button>

                <button
                  onClick={() => {
                    submitTest();
                    setTest("TEST-LIST");
                  }}
                  className="btn btn-danger mx-2"
                >
                  Submit Test
                </button>
              </div>
            </div>

            {/* Mobile Sidebar - Slides in from right */}

            <Aside
              toggleSidebar={toggleSidebar}
              sidebarOpen={sidebarOpen}
              settestCounter={settestCounter}
            />

            {/* Backdrop for mobile */}
          </main>
        </span>
        {/* )} */}
      </div>
    </div>
  );
};

export default Attend;
