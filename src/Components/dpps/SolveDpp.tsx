"use client";
import { resetAttendFormData } from "@/Redux/Reducers/AttendSlice";
import { resetAttending } from "@/Redux/Reducers/AttendStatus";
import {
  addQuestion,
  resetQuestions,
  setCurrentQuestion,
  submitTestCompleted,
} from "@/Redux/Reducers/UserAnswers";
import { RootState } from "@/Redux/Store";
import { getQuestion } from "@/server/tests";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import IntegerQuestion from "../Test/Test Components/attending/IntegerQuestion";
import BooleanQuestion from "../Test/Test Components/attending/BooleanQuestions";
import SelecQuestion from "../Test/Test Components/attending/SelecQuestion";
import MatchTheColumn from "../Test/Test Components/attending/MatchTheColumn";
import ExamInstructions from "../Test/Test Components/attending/Instruction";
import { Info } from "react-feather";
import SubjectButtons from "../Test/Test Components/attending/SubjectButtons";
import { SlMenu } from "react-icons/sl";
import Aside from "../Test/Test Components/attending/Aside";
import TestSubmissionPage from "../Test/Test Components/attending/TestSubmissionPage";
import { getDppById } from "@/server/dpp";
import { DppQuestions, DppStatus } from "@/Types/DppMeta";
import DppIntegerQuestion from "./questions/DppIntegerQuestion";
import DppBooleanQuestions from "./questions/DppBooleanQuestions";
import DppSelectQuestions from "./questions/DppSelectQuestions";
import { render } from "katex";

type Props = {
  id: String;
};

const SolveDpp: React.FC<Props> = ({ id }) => {
  const [integerQuestion, setintegerQuestion] = useState({
    subject: "",
    topic: "",
    subtopic: "",
    level: "",
    type: "integer",
    description: "",
    correctAnswer: "",
    descriptionImage: "",

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
  // const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [isMobile, setIsMobile] = useState(false);
  const test = useSelector((state: RootState) => state.attend);
  const [dpp, setDpp] = useState<DppQuestions[]>([]);
  // const user = useSelector((state: any) => state.user);
  const [index, setIndex] = useState(0);
  const ref = useRef(null);
  // const [showInstruction, setShowInstruction] = useState(true);
  // const [showSubmission, setShowSubmission] = useState(false);
  // const dispatch = useDispatch();
  const [loading, setLoadding] = useState(true);

  useEffect(() => {
    getDppById(id)
      .then((data) => {
        if (data?.questions && data?.questions?.length > 0) {
          setDpp(data?.questions);
        } else {
          setDpp([]);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoadding(false);
      });
  }, [id]);

  // useEffect(() => {
  //   test.Questions.forEach((SingleTest, index) => {
  //     // console.log(SingleTest);
  //     const respone = {
  //       color: "white",
  //       questionIndex: index,
  //       questionId: SingleTest.questionId,
  //       testId: test._id,
  //       userId: user._id,
  //       rightAnswer: SingleTest.correctAnswer,
  //       userAnswer: "null",
  //       questionStatus: "INIT",
  //       type: SingleTest.questionType,
  //       subject: SingleTest.subject,
  //       marks: 0,
  //       timeTaken: 0,
  //     };
  //     dispatch(addQuestion(respone));
  //   });

  //   return () => {
  //     dispatch(resetAttending());
  //     dispatch(addQuestion([]));
  //     dispatch(resetAttendFormData());
  //     dispatch(resetQuestions());
  //   };
  // }, []);

  // const updateIndex = useCallback(
  //   (action: string) => {
  //     if (action === "INCREMENT") {
  //       if (testCounter < test.Questions.length - 1) {
  //         settestCounter((prev) => prev + 1);
  //         dispatch(
  //           setCurrentQuestion(test.Questions[testCounter + 1].questionId)
  //         );
  //       } else {
  //         toast.error("You have reached the last question.", {
  //           position: "top-center",
  //         });
  //       }
  //     } else if (action === "DECREMENT") {
  //       if (testCounter > 0) {
  //         settestCounter((prev) => prev - 1);
  //         dispatch(
  //           setCurrentQuestion(test.Questions[testCounter - 1].questionId)
  //         );
  //       } else {
  //         toast.error("You are already at the first question.", {
  //           position: "top-center",
  //         });
  //       }
  //     }
  //   },
  //   [testCounter, test.Questions.length, settestCounter]
  // );

  // useEffect(() => {
  //   setLoadding(true);
  //   const questionId = test.Questions[testCounter].questionId;
  //   const type = test.Questions[testCounter].questionType;

  //   getQuestion(questionId, type)
  //     .then((data) => {
  //       console.log(data);

  //       if (type === "integer" || type === "boolean") {
  //         setintegerQuestion(data);
  //       } else if (type === "single_choice" || type === "multiple_choice") {
  //         setmultiSelectQuestion(data);
  //       } else {
  //         setmatchTheColumn(data);
  //       }
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     })
  //     .finally(() => {
  //       setLoadding(false);
  //     });
  // }, [testCounter]);

  // const toggleSidebar = () => {
  //   setSidebarOpen(!sidebarOpen);
  // };

  function submitTest() {
    // attendTestNow(test._id, user._id);
    // dispatch(submitTestCompleted());
    // dispatch(resetAttending());
    // submitTest();
    // setTest("TEST-LIST");
  }

  if (loading) {
    return <div className="text-center p-5">Loading...</div>;
  }

  if (dpp.length === 0) {
    return <div className="text-center p-5">No questions found</div>;
  }

  const renderQuestionComponent = async (index: number) => {
    const questionId = dpp[index].questionId;
    const questionType = dpp[index].questionType;
    // fetch the question data
    const data = await getQuestion(questionId, questionType);
    if (questionType === "integer" || questionType === "boolean") {
      if (questionType === "integer") {
        return (
          <DppIntegerQuestion
            integerQuestion={data}
            negativeMarking={Number(integerQuestion?.marks?.correct ?? 0)}
            positiveMarking={Number(integerQuestion?.marks?.incorrect ?? 0)}
          />
        );
      } else {
        return (
          <DppBooleanQuestions
            booleanQuestion={data}
            index={testCounter}
            negativeMarking={Number(integerQuestion?.marks?.correct ?? 0)}
            positiveMarking={Number(integerQuestion?.marks?.incorrect ?? 0)}
          />
        );
      }
    } else if (
      questionType === "single_choice" ||
      questionType === "multiple_choice"
    ) {
      return (
        <DppSelectQuestions
          selectQuestion={data}
          negativeMarking={Number(multiSelectQuestion?.marks?.correct ?? 0)}
          positiveMarking={Number(multiSelectQuestion?.marks?.incorrect ?? 0)}
          testCounter={index}
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

  const handleNext = () => {
    if (index < dpp.length - 1) {
      setIndex(index + 1);
    } else {
      toast.error("You have reached the last question.");
    }
  };

  const handlePrevious = () => {
    if (index > 0) {
      setIndex(index - 1);
    } else {
      toast.error("You are already at the first question.");
    }
  };
  const handleGo = () => {
    if (ref.current) {
      const index = Number(ref.current.value) - 1;
      if (index < dpp.length - 1 && index >= 0) {
        setIndex(index);
      } else {
        toast.error("You have reached the last question.");
      }
    }
  };
  return (
    <div>
      {" "}
      <div>{renderQuestionComponent(index)}</div>
      <div className="d-flex justify-content-center gap-5 flex-row">
        <button className="btn btn-outline-primary" onClick={handlePrevious}>
          Previous
        </button>
        <button className="btn btn-outline-primary" onClick={handleNext}>
          Next
        </button>
        <div className="d-flex justify-content-center gap-4">
          <input
            ref={ref}
            className="w-fit"
            type="number"
            name="marks"
            id=""
            value={index + 1}
            max={dpp.length}
            style={{
              maxWidth: "60px",
            }}
          />
          <button className="btn btn-primary" onClick={handleGo}>
            Go
          </button>
        </div>
        <div>{`${index + 1}/${dpp.length}`}</div>
      </div>
    </div>
  );
};

export default SolveDpp;
