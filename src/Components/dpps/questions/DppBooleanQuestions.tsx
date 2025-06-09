import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/Store";
import { addQuestion } from "@/Redux/Reducers/UserAnswers";
import { toast } from "react-toastify";
import { BlockMath, InlineMath } from "react-katex";

interface BooleanQuestionProps {
  booleanQuestion: {
    subject: string;
    topic: string;
    subtopic: string;
    level: string;
    type: string; // "BOOLEAN"
    description: string;
    correctAnswer: string; // "true" or "false"
    descriptionImage?: string;

    _id: string;
  };
  index: number;
  // testId: string;
  negativeMarking: number;
  positiveMarking: number;
  // settestCounter: React.Dispatch<React.SetStateAction<number>>;
}

const DppBooleanQuestions: React.FC<BooleanQuestionProps> = ({
  booleanQuestion,
  index,
  // testId,
  negativeMarking,
  positiveMarking,
  // settestCounter,
}) => {
  const start = Date.now();
  const dispatch = useDispatch();
  const [answer, setAnswer] = useState<string>("");
  const user = useSelector((state: any) => state.user);
  const test = useSelector((state: RootState) => state.attend);
  const renderTextWithLatex = (text: string) => {
    const parts = text.split(/(\\\[.*?\\\])/g); // Splits into plain text and LaTeX parts

    return parts.map((part, index) => {
      if (part.startsWith("\\[")) {
        const latex = part.slice(2, -2); // Remove \[ and \]
        return <InlineMath key={index} math={latex} />;
      } else {
        return <span key={index}>{part}</span>;
      }
    });
  };
  const saveTheAnswer = (color: string, action: string) => {
    const status =
      booleanQuestion.correctAnswer.toLowerCase() === answer.toLowerCase()
        ? "CORRECT"
        : "INCORRECT";

    const response = {
      color: color,
      // questionIndex: index,
      questionId: booleanQuestion._id,
      // testId: testId,
      userId: user._id,
      rightAnswer: booleanQuestion.correctAnswer,
      userAnswer: action === "SAVE" ? answer : action === "CLEAR" ? "" : "",
      questionStatus: status,
      type: booleanQuestion.type,
      subject: booleanQuestion.subject,
      marks:
        status === "CORRECT"
          ? positiveMarking
          : negativeMarking < 0
          ? negativeMarking
          : -Number(negativeMarking),
      timeTaken: Date.now() - start,
    };

    // dispatch(addQuestion(response));
    // if (test.Questions.length - 1 > index) {
    //   settestCounter((prev) => prev + 1);
    // } else {
    //   toast.success("No next question...", {
    //     position: "top-center",
    //   });
    // }
  };

  return (
    <div className="container mt-5 rounded-4 p-3 my-4">
      <section className="d-flex justify-content-start align-items-center gap-4 flex-wrap">
        <div className="mb-3 text-center">
          <label className="form-label">Subject</label>
          <p className="form-control-plaintext">{booleanQuestion.subject}</p>
        </div>
        <div className="mb-3 text-center">
          <label className="form-label">Level</label>
          <p className="form-control-plaintext">{booleanQuestion.level}</p>
        </div>
      </section>

      <div
        className="bg-white p-3 rounded-4"
        style={{ border: "1px solid #00000029" }}
      >
        <div className="mb-3 border-bottom pt-3">
          <h4 className="">Description</h4>
          <p
            className="form-control-plaintext"
            // dangerouslySetInnerHTML={{ __html: booleanQuestion.description }}
          >
            {renderTextWithLatex(booleanQuestion.description)}
          </p>
          <div>
            {booleanQuestion.descriptionImage && (
              <div className="text-center mb-3">
                <img
                  src={`${booleanQuestion.descriptionImage}`}
                  alt="Description"
                  className="img-fluid"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "https://imgs.search.brave.com/a1FMQyNdOc5gyx3b4vvRAg3wHarjMLHcLQXJ4FJqU0g/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly80ZGRp/Zy50ZW5vcnNoYXJl/LmNvbS9pbWFnZXMv/cGhvdG8tcmVjb3Zl/cnkvaW1hZ2VzLW5v/dC1mb3VuZC5qcGc";
                  }}
                  style={{ maxWidth: "400px" }}
                />
              </div>
            )}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Select Answer</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              // name={`booleanAnswer-${index}`}
              // id={`true-${index}`}
              value="true"
              checked={answer === "true"}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <label className="form-check-label" htmlFor={`true-${index}`}>
              True
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name={`booleanAnswer-${index}`}
              id={`false-${index}`}
              value="false"
              checked={answer === "false"}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <label className="form-check-label" htmlFor={`false-${index}`}>
              False
            </label>
          </div>
        </div>
      </div>

      <div className="container my-2">
        <div className="row g-2">
          <div className="col-5 col-sm-6 col-lg-3">
            <button
              className="btn btn-success w-100 fs-6"
              onClick={() => saveTheAnswer("green", "SAVE")}
            >
              Save & Next
            </button>
          </div>
          <div className="col-7 col-sm-6 col-lg-3">
            <button
              className="btn btn-primary w-100 fs-6"
              onClick={() => saveTheAnswer("blue", "SAVE-MARK")}
            >
              Save & Mark for Review
            </button>
          </div>
          <div className="col-6 col-sm-6 col-lg-3">
            <button
              className="btn btn-warning w-100 fs-6"
              onClick={() => saveTheAnswer("yellow", "REVIEW")}
            >
              Mark for Review
            </button>
          </div>
          <div className="col-6 col-sm-6 col-lg-3">
            <button
              className="btn btn-dark w-100 fs-6"
              onClick={() => {
                setAnswer("");
                saveTheAnswer("white", "CLEAR");
              }}
            >
              Clear Response
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DppBooleanQuestions;
