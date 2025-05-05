import { addQuestion, submitTestCompleted } from "@/Redux/Reducers/UserAnswers";
import { RootState } from "@/Redux/Store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles
import { FaEye, FaImage } from "react-icons/fa";
import { MdClose } from "react-icons/md";

interface MatchColumnFormData {
  matchTheColumnQuestions: {
    subject: string;
    topic: string;
    subtopic: string;
    level: string;
    type: string;

    leftOptionsA: string;
    leftOptionsB: string;
    leftOptionsC: string;
    leftOptionsD: string;

    rightOptionsA: string;
    rightOptionsB: string;
    rightOptionsC: string;
    rightOptionsD: string;

    leftImagesA: string;
    leftImagesB: string;
    leftImagesC: string;
    leftImagesD: string;

    rightImagesA: string;
    rightImagesB: string;
    rightImagesC: string;
    rightImagesD: string;

    correctMatchings: { leftOption: number; rightOption: number }[];
    optionType: string;
    description: string;

    descriptionImage: string;
    _id: string;
  };
  index: number;
  testId: string;
  negativeMarking: number;
  positiveMarking: number;
  settestCounter: React.Dispatch<React.SetStateAction<number>>;
}

// create a map in js
let map = new Map();
map.set(0, "A");
map.set(1, "B");
map.set(2, "C");
map.set(3, "D");

const MatchTheColumn: React.FC<MatchColumnFormData> = ({
  matchTheColumnQuestions,
  index,
  testId,
  negativeMarking,
  positiveMarking,
  settestCounter,
}) => {
  const [matches, setMatches] = useState<{ left: string; right: string }[]>([]);
  const [modal, setModal] = useState({
    text1: "",
    text2: "",
    descriptionImage: "",
  });
  const [showImageModal, setShowImageModal] = useState(false);
  const start = Date.now();
  const handleMatchChange = (leftOption: string, rightOption: string) => {
    setMatches((prev) => {
      const existingMatchIndex = prev.findIndex(
        (match) => match.left === leftOption
      );

      if (existingMatchIndex !== -1) {
        // Update the existing match
        const updatedMatches = [...prev];
        updatedMatches[existingMatchIndex] = {
          left: leftOption,
          right: rightOption,
        };
        return updatedMatches;
      } else {
        // Add a new match
        return [...prev, { left: leftOption, right: rightOption }];
      }
    });
  };

  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);

  const saveTheAnswer = (color: string, action: string) => {
    // console.log(matchTheColumnQuestions);
    const rightAnswers = matchTheColumnQuestions.correctMatchings;
    const userAnswers = matches;
    // check the answers
    let ansStatus = true;
    rightAnswers.map((rAns, ind) => {
      // left
      const left = map.get(ind); // left option A
      const right = map.get(rAns.rightOption - 1); //

      const result = userAnswers.find((obj) => obj.left === left);
      if (right !== result?.right) {
        ansStatus = false;
      }
    });

    const respone = {
      color: color,
      questionIndex: index,
      questionId: matchTheColumnQuestions._id,
      testId: testId,
      userId: user._id,
      rightAnswer: rightAnswers,
      userAnswer:
        action === "SAVE" || action === "SAVE"
          ? userAnswers
          : action === "CLEAR"
          ? ""
          : action === "REVIEW"
          ? ""
          : "",
      questionStatus: ansStatus ? "CORRECT" : "INCORRECT",
      marks: ansStatus ? positiveMarking : negativeMarking,
      type: matchTheColumnQuestions.type,
      subject: matchTheColumnQuestions.subject,
      timeTaken: Date.now() - start,
    };

    dispatch(addQuestion(respone));
    // console.log(respone);
    if (test.Questions.length - 1 > index) {
      settestCounter((prev) => prev + 1);
    } else {
      toast.success("No next question...", {
        position: "top-center",
      });
    }
  };

  const test = useSelector((state: RootState) => state.attend);

  // }

  return (
    <div className="container mt-4 w-100 bg-light rounded-4 p-1 text-dark position-relative">
      {/* Question Metadata */}
      <section
        className="d-flex justify-content-start align-items-center flex-row gap-4 flex-wrap"
        // style={{
        //   borderBottom: "2px solid",
        //   width: "fit-content",
        // }}
      >
        <div className="mb-3 text-center">
          <label className="form-label">Subject</label>
          <p className="form-control-plaintext">
            {matchTheColumnQuestions.subject}
          </p>
        </div>
        <div className="mb-3 text-center">
          <label className="form-label">Topic</label>
          <p className="form-control-plaintext">
            {matchTheColumnQuestions.topic}
          </p>
        </div>
        {/* <div className="mb-3 text-center">
          <label className="form-label">Subtopic</label>
          <p className="form-control-plaintext">
            {matchTheColumnQuestions.subtopic}
          </p>
        </div> */}
        <div className="mb-3 text-center">
          <label className="form-label">Level</label>
          <p className="form-control-plaintext">
            {matchTheColumnQuestions.level}
          </p>
        </div>
      </section>

      {/* Description */}
      <div
        className="bg-white p-3 rounded-4"
        style={{
          border: "1px solid #00000029",
        }}
      >
        <div className="mt-3  border-bottom">
          <h6 className="">Description</h6>
          <div className="d-flex flex-row justify-content-center align-items-center gap-3">
            <p
              className="fw-bold m-0 p-0"
              dangerouslySetInnerHTML={{
                __html: matchTheColumnQuestions.description,
              }}
            />
            {matchTheColumnQuestions.descriptionImage && (
              <FaImage
                // src={process.env.NEXT_PUBLIC_BASE_URL + item.image}
                // alt={`Left Option ${item.option}`}
                className="img-fluid cursor-pointer pb-4"
                style={{ maxWidth: "150px" }}
                onClick={() => {
                  setModal({
                    text1: `Description`,
                    descriptionImage: `${matchTheColumnQuestions.descriptionImage}`,
                    text2: matchTheColumnQuestions.description,
                  });
                  setShowImageModal(true);
                }}
              >
                View Image
              </FaImage>
            )}
          </div>
          {/* <p
            className="fw-bold"
            dangerouslySetInnerHTML={{
              __html: matchTheColumnQuestions.description,
            }}
          ></p>
          {matchTheColumnQuestions.descriptionImage && (
            <div className="text-center mb-3">
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_URL}${matchTheColumnQuestions.descriptionImage}`}
                alt="Description"
                className="img-fluid"
                style={{ maxWidth: "400px" }}
              />
            </div>
          )} */}
        </div>

        {/* Columns for Matching */}
        <div
          className="d-flex h-fit flex-row gap-5 mt-5 justify-content-between"
          style={{
            minHeight: "400px",
            overflow: "scroll",
          }}
        >
          {/* Left Column */}
          <div className="col-md-6">
            <h6
              className="text-center"
              style={{
                backgroundColor: "#32cc677d",
                padding: "3px 10px",
                borderRadius: "10px",
              }}
            >
              Left Column
            </h6>
            {[
              {
                option: "A",
                text: matchTheColumnQuestions.leftOptionsA,
                image: matchTheColumnQuestions.leftImagesA,
              },
              {
                option: "B",
                text: matchTheColumnQuestions.leftOptionsB,
                image: matchTheColumnQuestions.leftImagesB,
              },
              {
                option: "C",
                text: matchTheColumnQuestions.leftOptionsC,
                image: matchTheColumnQuestions.leftImagesC,
              },
              {
                option: "D",
                text: matchTheColumnQuestions.leftOptionsD,
                image: matchTheColumnQuestions.leftImagesD,
              },
            ].map((item) => (
              <div key={item.option} className="mb-3  border-bottom">
                <span className="d-flex flex-row gap-2">
                  <b
                    style={{
                      fontSize: ".8em",
                    }}
                  >
                    Option {item.option}
                  </b>
                  <div
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    {item.image && (
                      <FaImage
                        // src={process.env.NEXT_PUBLIC_BASE_URL + item.image}
                        // alt={`Left Option ${item.option}`}
                        className="img-fluid cursor-pointer"
                        style={{ maxWidth: "150px" }}
                        onClick={() => {
                          setModal({
                            text1: `Left Option ${item.option}`,
                            descriptionImage: `${item.image}`,
                            text2: item.text,
                          });
                          setShowImageModal(true);
                        }}
                      >
                        View Image
                      </FaImage>
                    )}
                  </div>
                </span>
                {/* <div className="d-flex flex-row gap-2"> */}
                <p
                  dangerouslySetInnerHTML={{
                    __html: item.text,
                  }}
                >
                  {/* {item.option}. */}
                </p>
              </div>
              // </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="col-md-6">
            <h6
              className="text-center"
              style={{
                backgroundColor: "#32cc677d",
                padding: "3px 10px",
                borderRadius: "10px",
              }}
            >
              Right Column
            </h6>
            {[
              {
                option: "A",
                text: matchTheColumnQuestions.rightOptionsA,
                image: matchTheColumnQuestions.rightImagesA,
              },
              {
                option: "B",
                text: matchTheColumnQuestions.rightOptionsB,
                image: matchTheColumnQuestions.rightImagesB,
              },
              {
                option: "C",
                text: matchTheColumnQuestions.rightOptionsC,
                image: matchTheColumnQuestions.rightImagesC,
              },
              {
                option: "D",
                text: matchTheColumnQuestions.rightOptionsD,
                image: matchTheColumnQuestions.rightImagesD,
              },
            ].map((item) => (
              <div key={item.option} className="mb-3  border-bottom">
                <span className="d-flex flex-row gap-2">
                  <b
                    style={{
                      fontSize: ".8em",
                    }}
                  >
                    Option {item.option}
                  </b>
                  <div
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    {item.image && (
                      <FaImage
                        // src={process.env.NEXT_PUBLIC_BASE_URL + item.image}
                        // alt={`Left Option ${item.option}`}
                        className="img-fluid cursor-pointer"
                        style={{ maxWidth: "150px" }}
                      >
                        View Image
                      </FaImage>
                    )}
                  </div>
                </span>
                <p
                  dangerouslySetInnerHTML={{
                    __html: item.text,
                  }}
                ></p>
                {/* {item.image && (
                  <img
                    src={process.env.NEXT_PUBLIC_BASE_URL + item.image}
                    alt={`Right Option ${item.option}`}
                    className="img-fluid"
                    style={{ maxWidth: "150px" }}
                  />
                )} */}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Matching Form */}
      <div className="mt-4">
        <h6
          className="text-center"
          style={{
            background: "#a6fcff8a",
            padding: "3px 0px",
            borderRadius: "10px",
            border: "1px solid",
          }}
        >
          Match the Left Options
        </h6>
        {["A", "B", "C", "D"].map((leftOption) => (
          <div key={leftOption} className="row align-items-center mb-3">
            <div className="col-md-6">
              <label className="form-label">Match for Left {leftOption}</label>
            </div>
            <div className="col-md-6">
              <select
                className="form-select"
                onChange={(e) => handleMatchChange(leftOption, e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>
                  Select Right Option
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
          </div>
        ))}

        {/* <div className="d-flex justify-content-center align-items-center gap-3 flex-wrap">
          <button
            style={{
              fontSize: "10px",
            }}
            className="btn btn-success mt-3 timesUp"
            onClick={() => {
              saveTheAnswer("green", "SAVE");
            }}
          >
            Save & Next
          </button>
          <button
            style={{
              fontSize: "10px",
            }}
            className="btn btn-primary mt-3 timesUp"
            onClick={() => {
              saveTheAnswer("blue", "SAVE-MARK");
            }}
          >
            Save and mark for review
          </button>
          <button
            style={{
              fontSize: "10px",
            }}
            className="btn btn-dark mt-3 timesUp"
            onClick={() => {
              saveTheAnswer("white", "CLEAR");
            }}
          >
            Clear response
          </button>
          <button
            style={{
              fontSize: "10px",
            }}
            className="btn btn-warning mt-3 timesUp"
            onClick={() => {
              saveTheAnswer("yellow", "REVIEW");
            }}
          >
            Mark for review and next
          </button>
        </div> */}
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

      {showImageModal && (
        <div
          className="position-absolute top-0 start-0 w-100 h-100  text-black"
          style={{
            backgroundColor: "#4e4e4e7d !important",
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            onClick={() => {
              setShowImageModal(false);
            }}
            className="my-3 mx-3"
          >
            <MdClose />
          </div>
          <div className="mx-3">
            <h3 className="text-black">{modal.text1}</h3>
            <h6 dangerouslySetInnerHTML={{ __html: modal.text2 }} />
          </div>
          <div className="mx-10">
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_URL}${modal.descriptionImage}`}
              className="w-100 h-auto d-flex justify-content-center"
              style={{ maxWidth: "400px" }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src =
                  "https://as2.ftcdn.net/jpg/10/46/43/33/1000_F_1046433335_5UVtQKp5On8zbytuOVv0pXh8lmyUAz3t.webp";
              }}
              alt="description image"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchTheColumn;
