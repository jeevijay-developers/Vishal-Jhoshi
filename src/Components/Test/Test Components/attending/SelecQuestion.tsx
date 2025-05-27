import {
  addQuestion,
  setCurrentQuestion,
  submitTestCompleted,
} from "@/Redux/Reducers/UserAnswers";
import { RootState } from "@/Redux/Store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles
import { MdClose } from "react-icons/md";
import { FaImage } from "react-icons/fa";
import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "react-katex";
import { string } from "yup";

interface IntegerQuestionProps {
  selectQuestion: {
    subject: string;
    topic: string;
    subtopic: string;
    level: string;
    type: string;
    description: string;
    descriptionImage: string;
    optionType: string;
    textOptionsA: string;
    textOptionsB: string;
    textOptionsC: string;
    textOptionsD: string;
    imageOptionsA: string;
    imageOptionsB: string;
    imageOptionsC: string;
    imageOptionsD: string;
    correctAnswer: string[];
    _id: string;
  };
  index: number;
  testId: string;
  negativeMarking: number;
  positiveMarking: number;
  settestCounter: React.Dispatch<React.SetStateAction<number>>;
  testCounter: number;
}

const SelecQuestion: React.FC<IntegerQuestionProps> = ({
  selectQuestion,
  index,
  testId,
  negativeMarking,
  positiveMarking,
  settestCounter,
  testCounter,
}) => {
  const [modal, setModal] = useState({
    text1: "",
    text2: "",
    descriptionImage: "",
  });

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
  const [showImageModal, setShowImageModal] = useState(false);
  const start = Date.now();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const handleCheckboxChange = (option: string | null) => {
    if (!option || option === "null") return; // ignore null or "null" strings

    setSelectedOptions((prevOptions) => {
      let updatedOptions = prevOptions.includes(option)
        ? prevOptions.filter((item) => item !== option)
        : [...prevOptions, option];

      // Clean up any garbage entries
      updatedOptions = updatedOptions.filter(
        (item) =>
          (item && item !== "null" && item.length === 1) || item === option
      );

      return updatedOptions;
    });
  };

  useEffect(() => {
    console.log("Updated selectedOptions:", selectedOptions);
  }, [selectedOptions]);

  const user = useSelector((state: any) => state.user);
  const question = useSelector((state: any) => state.answer.questions);
  const [alreadySelectedAnswer, setaAlreadySelectedAnswer] = useState([]);
  // console.log(question);
  useEffect(() => {
    question.forEach((item: any) => {
      if (item.questionId === selectQuestion._id) {
        if (item.userAnswer) {
          setSelectedOptions(item?.selectedOptions ?? [""]);
          // console.log(item.selectedOptions);

          return;
        }
        // setaAlreadySelectedAnswer([...item.userAnswer]);
      }
    });
  }, []);
  // console.log(alreadySelectedAnswer);

  const dispatch = useDispatch();

  function saveTheAnswer(color: string, action: string) {
    let ansStatus = false;

    const arr1 = selectQuestion.correctAnswer[0]
      .split(",")
      .map((item) => item.trim());
    const arr2 = selectedOptions;

    console.log(arr1);
    console.log(arr2);

    const countOccurrences = (arr: any) => {
      return arr.reduce((acc: any, char: string) => {
        acc[char] = (acc[char] || 0) + 1;
        return acc;
      }, {});
    };

    const map1 = countOccurrences(arr1);
    const map2 = countOccurrences(arr2);

    // Compare the keys and their counts
    for (let char in map1) {
      if (map1[char] !== map2[char]) {
        ansStatus = false;
      } else {
        ansStatus = true;
      }
    }

    if (arr1.length !== arr2.length) {
      ansStatus = false; // Different lengths mean arrays can't match.
    }

    console.log(ansStatus);

    const respone = {
      color: color,
      questionIndex: index,
      questionId: selectQuestion._id,
      testId: testId,
      userId: user._id,
      rightAnswer: selectQuestion.correctAnswer,
      userAnswer:
        action === "SAVE" || action === "SAVE"
          ? selectedOptions
          : action === "CLEAR"
          ? ""
          : action === "REVIEW"
          ? ""
          : "",
      questionStatus: ansStatus ? "CORRECT" : "INCORRECT",
      marks: ansStatus
        ? positiveMarking
        : negativeMarking < 0
        ? negativeMarking
        : -Number(negativeMarking),
      type: selectQuestion.type,
      subject: selectQuestion.subject,
      timeTaken: Date.now() - start,
      selectedOptions: selectedOptions,
    };

    dispatch(addQuestion(respone));
    // console.log(respone);
    if (test.Questions.length - 1 > index) {
      settestCounter((prev) => prev + 1);
      // add the next question id from here
      // console.log(test.Questions);

      dispatch(setCurrentQuestion(test.Questions[index + 1].questionId));
    } else {
      toast.success("No next question...", {
        position: "top-center",
      });
    }
  }

  const test = useSelector((state: RootState) => state.attend);

  return (
    <div className="container mt-4 w-100 rounded-4 p-3 my-4 position-relative">
      <section
        className="d-flex justify-content-start align-items-center flex-row gap-4 flex-wrap"
        // style={{
        //   borderBottom: "2px solid",
        //   width: "fit-content",
        // }}
      >
        <div className="mb-3 text-center">
          <label className="form-label text-primary fs-5">Subject</label>
          {selectQuestion.subject && (
            <p className="form-control-plaintext fs-5">
              {selectQuestion.subject}
            </p>
          )}
        </div>

        <div className="mb-3 text-center">
          <label className="form-label text-primary fs-5">Level</label>
          <p className="form-control-plaintext fs-5">{selectQuestion.level}</p>
        </div>
      </section>

      <div
        className="bg-white p-3 rounded-4"
        style={{
          border: "1px solid #00000029",
        }}
      >
        <div
          className="mt-3 border-bottom"
          style={{
            borderBottom: "2px dashed",
          }}
        >
          <h4 className="text-primary">Q. {testCounter + 1}</h4>
          <div className="d-flex flex-row justify-content-center align-items-center gap-3">
            {/* <InlineMath math={selectQuestion.description} /> */}
            <p className="fs-5">
              {renderTextWithLatex(selectQuestion.description)}
            </p>
            {/* {selectQuestion.descriptionImage && (
              <FaImage
                // src={process.env.NEXT_PUBLIC_BASE_URL + item.image}
                // alt={`Left Option ${item.option}`}
                className="img-fluid cursor-pointer pb-4"
                style={{ maxWidth: "150px" }}
                onClick={() => {
                  setModal({
                    text1: `Description`,
                    descriptionImage: `${selectQuestion.descriptionImage}`,
                    text2: selectQuestion.description,
                  });
                  setShowImageModal(true);
                }}
              >
                View Image
              </FaImage>
            )} */}
          </div>
          {selectQuestion.descriptionImage && (
            <div className="text-center mb-3">
              <img
                src={`${selectQuestion.descriptionImage}`}
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

        <div className="p-3">
          {/* Option A */}
          <div className="row g-2">
            <div className="col-6 mb-3">
              <div className="d-flex flex-row gap-2 align-items-center">
                <h6 className="m-0 p-0 text-primary fs-5">A.</h6>
                {/* {selectQuestion.imageOptionsA && (
                  <FaImage
                    // src={process.env.NEXT_PUBLIC_BASE_URL + item.image}
                    // alt={`Left Option ${item.option}`}
                    className="img-fluid cursor-pointer fs-5"
                    style={{ maxWidth: "150px" }}
                    onClick={() => {
                      setModal({
                        text1: `Option A`,
                        descriptionImage: `${selectQuestion.imageOptionsA}`,
                        text2: selectQuestion.textOptionsA,
                      });
                      setShowImageModal(true);
                    }}
                  >
                    View Image
                  </FaImage>
                )} */}
              </div>
              <div className={`w-auto`} style={{ cursor: "pointer" }}>
                {/* <p
                  className="p-0 m-0"
                  dangerouslySetInnerHTML={{
                    __html: selectQuestion.textOptionsA,
                  }}
                /> */}
                <p className="fs-5">
                  {renderTextWithLatex(selectQuestion.textOptionsA)}
                </p>

                {selectQuestion.imageOptionsA && (
                  <img
                    // src={`${process.env.NEXT_PUBLIC_BASE_URL}/${selectQuestion.imageOptionsA}`}
                    src={`${selectQuestion.imageOptionsA}`}
                    alt="Option A"
                    className="img-fluid"
                    style={{ maxWidth: "200px" }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        "https://imgs.search.brave.com/a1FMQyNdOc5gyx3b4vvRAg3wHarjMLHcLQXJ4FJqU0g/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly80ZGRp/Zy50ZW5vcnNoYXJl/LmNvbS9pbWFnZXMv/cGhvdG8tcmVjb3Zl/cnkvaW1hZ2VzLW5v/dC1mb3VuZC5qcGc";
                    }}
                  />
                )}
              </div>
              {/* <div className=" mt-2">
                <label htmlFor="optionA" className="form-check-label me-2">
                  Select A
                </label>
                <input
                  type="checkbox"
                  id="optionA"
                  className="form-check-input"
                  checked={selectedOptions.includes("A")}
                  onChange={() => handleCheckboxChange("A")}
                />
              </div> */}
            </div>

            {/* Option B */}
            <div className="col-6 mb-3">
              <div className="d-flex flex-row gap-2 align-items-center">
                <h6 className="m-0 p-0 text-primary fs-5">B.</h6>
                {/* {selectQuestion.imageOptionsB && (
                  <FaImage
                    // src={process.env.NEXT_PUBLIC_BASE_URL + item.image}
                    // alt={`Left Option ${item.option}`}
                    className="img-fluid cursor-pointer fs-5"
                    style={{ maxWidth: "150px" }}
                    onClick={() => {
                      setModal({
                        text1: `Option B`,
                        descriptionImage: `${selectQuestion.imageOptionsB}`,
                        text2: selectQuestion.textOptionsB,
                      });
                      setShowImageModal(true);
                    }}
                  >
                    View Image
                  </FaImage>
                )} */}
              </div>
              <div className={``} style={{ cursor: "pointer" }}>
                {/* <p
                  dangerouslySetInnerHTML={{
                    __html: selectQuestion.textOptionsB,
                  }}
                ></p> */}
                <p className="fs-5">
                  {renderTextWithLatex(selectQuestion.textOptionsB)}
                </p>
                {selectQuestion.imageOptionsB && (
                  <img
                    src={`${selectQuestion.imageOptionsB}`}
                    alt="Option B"
                    className="img-fluid "
                    style={{ maxWidth: "200px" }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        "https://imgs.search.brave.com/a1FMQyNdOc5gyx3b4vvRAg3wHarjMLHcLQXJ4FJqU0g/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly80ZGRp/Zy50ZW5vcnNoYXJl/LmNvbS9pbWFnZXMv/cGhvdG8tcmVjb3Zl/cnkvaW1hZ2VzLW5v/dC1mb3VuZC5qcGc";
                    }}
                  />
                )}
              </div>
              {/* <div className=" mt-2">
                <label htmlFor="optionB" className="form-check-label me-2">
                  Select B
                </label>
                <input
                  type="checkbox"
                  id="optionB"
                  className="form-check-input"
                  checked={selectedOptions.includes("B")}
                  onChange={() => handleCheckboxChange("B")}
                />
              </div> */}
            </div>
            {/* </div> */}

            {/* Option C */}
            {/* <div className="d-flex justify-content-center align-items-center flex-row gap-4 flex-wrap"> */}
            <div className="col-6 mb-3">
              <div className="d-flex flex-row gap-2 align-items-center">
                <h6 className="m-0 p-0 text-primary fs-5">C.</h6>
                {/* {selectQuestion.imageOptionsC && (
                  <FaImage
                    // src={process.env.NEXT_PUBLIC_BASE_URL + item.image}
                    // alt={`Left Option ${item.option}`}
                    className="img-fluid cursor-pointer"
                    style={{ maxWidth: "150px" }}
                    onClick={() => {
                      setModal({
                        text1: `Option C`,
                        descriptionImage: `${selectQuestion.imageOptionsA}`,
                        text2: selectQuestion.textOptionsC,
                      });
                      setShowImageModal(true);
                    }}
                  >
                    View Image
                  </FaImage>
                )} */}
              </div>
              <div className={``} style={{ cursor: "pointer" }}>
                {/* <p
                  dangerouslySetInnerHTML={{
                    __html: selectQuestion.textOptionsC,
                  }}
                ></p> */}
                <p className="fs-5">
                  {renderTextWithLatex(selectQuestion.textOptionsC)}
                </p>
                {selectQuestion.imageOptionsC && (
                  <img
                    src={`${selectQuestion.imageOptionsC}`}
                    alt="Option C"
                    className="img-fluid"
                    style={{ maxWidth: "200px" }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        "https://imgs.search.brave.com/a1FMQyNdOc5gyx3b4vvRAg3wHarjMLHcLQXJ4FJqU0g/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly80ZGRp/Zy50ZW5vcnNoYXJl/LmNvbS9pbWFnZXMv/cGhvdG8tcmVjb3Zl/cnkvaW1hZ2VzLW5v/dC1mb3VuZC5qcGc";
                    }}
                  />
                )}
              </div>
              {/* <div className=" mt-2">
                <label htmlFor="optionC" className="form-check-label me-2">
                  Select C
                </label>
                <input
                  type="checkbox"
                  id="optionC"
                  className="form-check-input"
                  checked={selectedOptions.includes("C")}
                  onChange={() => handleCheckboxChange("C")}
                />
              </div> */}
            </div>

            {/* Option D */}
            <div className="col-6 mb-3">
              <div className="d-flex flex-row gap-2 align-items-center">
                <h6 className="m-0 p-0 text-primary fs-5">D.</h6>
                {/* {selectQuestion.imageOptionsD && (
                  <FaImage

                    className="img-fluid cursor-pointer"
                    style={{ maxWidth: "150px" }}
                    onClick={() => {
                      setModal({
                        text1: `Option D`,
                        descriptionImage: `${selectQuestion.imageOptionsD}`,
                        text2: selectQuestion.textOptionsD,
                      });
                      setShowImageModal(true);
                    }}
                  >
                    View Image
                  </FaImage>
                )} */}
              </div>
              <div
                className={`d-flex flex-row gap-3`}
                style={{ cursor: "pointer" }}
              >
                {/* <p
                  dangerouslySetInnerHTML={{
                    __html: selectQuestion.textOptionsD,
                  }}
                ></p> */}
                <p className="fs-5">
                  {renderTextWithLatex(selectQuestion.textOptionsD)}
                </p>
                {selectQuestion.imageOptionsD && (
                  <img
                    src={`${selectQuestion.imageOptionsD}`}
                    alt="Option D"
                    className="img-fluid"
                    style={{ maxWidth: "200px" }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        "https://imgs.search.brave.com/a1FMQyNdOc5gyx3b4vvRAg3wHarjMLHcLQXJ4FJqU0g/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly80ZGRp/Zy50ZW5vcnNoYXJl/LmNvbS9pbWFnZXMv/cGhvdG8tcmVjb3Zl/cnkvaW1hZ2VzLW5v/dC1mb3VuZC5qcGc";
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Select an option */}
        <div className="d-flex flex-row gap-3">
          <div className=" mt-2">
            <label htmlFor="optionA" className="form-check-label me-2">
              A
            </label>
            <input
              type="checkbox"
              id="optionA"
              value={"A"}
              className="form-check-input"
              checked={selectedOptions.includes("A")}
              onChange={(e) => handleCheckboxChange(e.target.value)}
            />
          </div>
          <div className=" mt-2">
            <label htmlFor="optionB" className="form-check-label me-2">
              B
            </label>
            <input
              type="checkbox"
              id="optionB"
              value={"B"}
              className="form-check-input"
              checked={selectedOptions.includes("B")}
              onChange={(e) => handleCheckboxChange(e.target.value)}
            />
          </div>
          <div className=" mt-2">
            <label htmlFor="optionC" className="form-check-label me-2">
              C
            </label>
            <input
              type="checkbox"
              id="optionC"
              className="form-check-input"
              value={"C"}
              checked={selectedOptions.includes("C")}
              onChange={(e) => handleCheckboxChange(e.target.value)}
            />
          </div>
          <div className="mt-2">
            <label htmlFor="optionD" className="form-check-label me-2">
              D
            </label>
            <input
              type="checkbox"
              id="optionD"
              className="form-check-input"
              value={"D"}
              checked={selectedOptions.includes("D")}
              onChange={(e) => handleCheckboxChange(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="container my-2">
        <div className="row g-2">
          <div className="col-5 col-sm-6 col-lg-3">
            <button
              className="btn btn-success w-100 timesUp fs-6"
              style={{ fontSize: "10px", width: "37% !important" }}
              onClick={() => saveTheAnswer("#00e600", "SAVE")}
            >
              Save & Next
            </button>
          </div>
          <div className="col-7 col-sm-6 col-lg-3">
            <button
              className="btn btn-primary w-100 timesUp fs-6"
              style={{ fontSize: "10px", width: "63% !important " }}
              onClick={() => saveTheAnswer("#5097ff", "SAVE-MARK")}
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
  );
};

export default SelecQuestion;
