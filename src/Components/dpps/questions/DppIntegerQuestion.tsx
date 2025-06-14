import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/Store";
import { addQuestion } from "@/Redux/Reducers/UserAnswers";
import { toast } from "react-toastify";
import { BlockMath, InlineMath } from "react-katex";
import { setQuestions } from "@/Redux/Reducers/DppSlice";

interface IntegerQuestionProps {
  integerQuestion: {
    subject: string; // Allow any string, not just ""
    topic: string;
    subtopic: string;
    level: string;
    type: string; // Keep "integer" as a specific value
    description: string;
    correctAnswer: string;
    descriptionImage?: string;
    _id: string;
  };
  // index: number;
  // testId: string;
  negativeMarking: number;
  positiveMarking: number;
  // settestCounter: React.Dispatch<React.SetStateAction<number>>;
}

const DppIntegerQuestion: React.FC<IntegerQuestionProps> = ({
  integerQuestion,
  // index,
  // testId,
  negativeMarking,
  positiveMarking,
  // settestCounter,
}) => {
  const start = Date.now();
  const dispatch = useDispatch();
  const [answer, setAnswer] = useState<number>();
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
    const userANS = answer?.toString;
    const status =
      Number(integerQuestion.correctAnswer) === Number(answer)
        ? "CORRECT"
        : "INCORRECT";
    const respone = {
      color: color,
      // questionIndex: index,
      questionId: integerQuestion._id,
      // testId: testId,
      userId: user._id,
      rightAnswer: integerQuestion.correctAnswer,
      userAnswer:
        action === "SAVE" || action === "SAVE"
          ? answer
          : action === "CLEAR"
          ? ""
          : action === "REVIEW"
          ? ""
          : "",
      questionStatus: status,
      type: integerQuestion.type,
      subject: integerQuestion.subject,
      marks:
        status === "CORRECT"
          ? positiveMarking
          : negativeMarking < 0
          ? negativeMarking
          : -Number(negativeMarking),
      timeTaken: Date.now() - start,
    };

    dispatch(
      setQuestions({
        description: integerQuestion.description,
        status: status ? "CORRECT" : "INCORRECT",
      })
    );
    // dispatch(addQuestion(respone));
    // if (test.Questions.length - 1 > index) {
    //   settestCounter((prev) => prev + 1);
    // } else {
    //   toast.success("No next question...", {
    //     position: "top-center",
    //   });
    // }
  };

  return (
    <div className="container mt-5  rounded-4 p-3 my-4">
      <div>
        <section className="d-flex justify-content-start align-items-center flex-row gap-4 flex-wrap">
          <div className="mb-3 text-center">
            <label className="form-label">Subject</label>
            <p className="form-control-plaintext">{integerQuestion.subject}</p>
          </div>
          <div className="mb-3 text-center">
            <label className="form-label">Level</label>
            <p className="form-control-plaintext">{integerQuestion.level}</p>
          </div>
        </section>
        <div
          className="bg-white p-3 rounded-4"
          style={{
            border: "1px solid #00000029",
          }}
        >
          <div className="mb-3 border-bottom pt-3">
            <h4 className="">Description</h4>
            {/* <label className="form-label">Description</label> */}
            <p
              className="form-control-plaintext"
              // dangerouslySetInnerHTML={{ __html: integerQuestion.description }}
            >
              {renderTextWithLatex(integerQuestion.description)}
              {/* {integerQuestion.description} */}
            </p>
            {integerQuestion.descriptionImage && (
              <div className="text-center mb-3">
                <img
                  src={`${integerQuestion.descriptionImage}`}
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
          {/* <div className="mb-3">
            <label htmlFor="correctAnswer" className="form-label">
              Correct Answer
            </label>
            <input
              type="number"
              id="correctAnswer"
              name="correctAnswer"
              className="form-control"
              onChange={(e) => {
                setAnswer(Number(e.target.value));
              }}
              // value={integerQuestion.correctAnswer}
              // onChange={handleInputChange}
            />
          </div> */}
        </div>

        <div className="container my-2">
          <div className="row g-2">
            <div className="col-5 col-sm-6 col-lg-3">
              <button
                className="btn btn-success w-100 timesUp fs-6"
                style={{ fontSize: "10px", width: "37% !important" }}
                onClick={() => saveTheAnswer("green", "SAVE")}
              >
                Save & Next
              </button>
            </div>
            <div className="col-7 col-sm-6 col-lg-3">
              <button
                className="btn btn-primary w-100 timesUp fs-6"
                style={{ fontSize: "10px", width: "63% !important " }}
                onClick={() => saveTheAnswer("blue", "SAVE-MARK")}
              >
                Save & mark for review
              </button>
            </div>

            <div
              className="col-6 col-sm-6 col-lg-3"
              style={{ fontSize: "10px", width: "45% !important" }}
            >
              <button
                className="btn btn-warning w-100 timesUp fs-6"
                onClick={() => saveTheAnswer("yellow", "REVIEW")}
              >
                Mark for review
              </button>
            </div>
            <div
              className="col-6 col-sm-6 col-lg-3"
              style={{ fontSize: "10px", width: "55% !important" }}
            >
              <button
                className="btn btn-dark w-100 timesUp fs-6"
                style={{ fontSize: "10px", width: "55% !important" }}
                onClick={() => saveTheAnswer("white", "CLEAR")}
              >
                Clear response
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DppIntegerQuestion;
