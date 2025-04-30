import { addQuestion, submitTestCompleted } from "@/Redux/Reducers/UserAnswers";
import { RootState } from "@/Redux/Store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles
import { MdClose } from "react-icons/md";
import { FaImage } from "react-icons/fa";

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
}

const SelecQuestion: React.FC<IntegerQuestionProps> = ({
  selectQuestion,
  index,
  testId,
  negativeMarking,
  positiveMarking,
  settestCounter,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [modal, setModal] = useState({
    text1: "",
    text2: "",
    descriptionImage: "",
  });
  const [showImageModal, setShowImageModal] = useState(false);
  const start = Date.now();
  const handleCheckboxChange = (option: string) => {
    setSelectedOptions(
      (prev) =>
        prev.includes(option)
          ? prev.filter((item) => item !== option) // Remove if already selected
          : [...prev, option] // Add if not already selected
    );
  };

  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  function saveTheAnswer(color: string, action: string) {
    let ansStatus = false;

    const arr1 = selectQuestion.correctAnswer;
    const arr2 = selectedOptions;

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
      marks: ansStatus ? positiveMarking : negativeMarking,
      type: selectQuestion.type,
      subject: selectQuestion.subject,
      timeTaken: Date.now() - start,
    };

    dispatch(addQuestion(respone));
    console.log(respone);
    if (test.Questions.length - 1 > index) {
      settestCounter((prev) => prev + 1);
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
          <label className="form-label">Subject</label>
          {selectQuestion.subject && (
            <p className="form-control-plaintext">{selectQuestion.subject}</p>
          )}
        </div>
        <div className="mb-3 text-center">
          <label className="form-label">Topic</label>
          <p className="form-control-plaintext">{selectQuestion.topic}</p>
        </div>
        {/* <div className="mb-3 text-center">
          <label className="form-label">Subtopic</label>
          <p className="form-control-plaintext">{selectQuestion.subtopic}</p>
        </div> */}

        <div className="mb-3 text-center">
          <label className="form-label">Level</label>
          <p className="form-control-plaintext">{selectQuestion.level}</p>
        </div>
        {/* <div className="mb-3 text-center">
          <label className="form-label">Type</label>
          <p className="form-control-plaintext">{selectQuestion.type}</p>
        </div> */}
        {/* <div className="mb-3 text-center">
          <label className="form-label">Selection Mode</label>
          <p className="form-control-plaintext">
            {selectQuestion.correctAnswer.length > 1
              ? "Multi Select"
              : "Single Select"}
          </p>
        </div> */}
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
          <h4 className="">Description</h4>
          <div className="d-flex flex-row justify-content-center align-items-center gap-3">
            <p
              className="fw-bold m-0 p-0"
              dangerouslySetInnerHTML={{
                __html: selectQuestion.description,
              }}
            />
            {selectQuestion.descriptionImage && (
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
            )}
          </div>
          {/* {selectQuestion.descriptionImage && (
            <div className="text-center mb-3">
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_URL}${selectQuestion.descriptionImage}`}
                alt="Description"
                className="img-fluid"
                style={{ maxWidth: "400px" }}
              />
            </div>
          )} */}
        </div>

        <div className="p-3">
          {/* Option A */}
          <div className="row g-2">
            <div className="col-6 mb-3">
              <div className="d-flex flex-row gap-2 align-items-center">
                <h6 className="m-0 p-0">A.</h6>
                {selectQuestion.imageOptionsA && (
                  <FaImage
                    // src={process.env.NEXT_PUBLIC_BASE_URL + item.image}
                    // alt={`Left Option ${item.option}`}
                    className="img-fluid cursor-pointer"
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
                )}
              </div>
              <div className={`w-auto`} style={{ cursor: "pointer" }}>
                <p
                  className="p-0 m-0"
                  dangerouslySetInnerHTML={{
                    __html: selectQuestion.textOptionsA,
                  }}
                />

                {/* {selectQuestion.imageOptionsA && (
                  <img
                    // src={`${process.env.NEXT_PUBLIC_BASE_URL}/${selectQuestion.imageOptionsA}`}
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}${selectQuestion.imageOptionsA}`}
                    alt="Option A"
                    className="img-fluid"
                    style={{ maxWidth: "200px" }}
                  />
                )} */}
              </div>
              <div className=" mt-2">
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
              </div>
            </div>

            {/* Option B */}
            <div className="col-6 mb-3">
              <div className="d-flex flex-row gap-2 align-items-center">
                <h6 className="m-0 p-0">B.</h6>
                {selectQuestion.imageOptionsB && (
                  <FaImage
                    // src={process.env.NEXT_PUBLIC_BASE_URL + item.image}
                    // alt={`Left Option ${item.option}`}
                    className="img-fluid cursor-pointer"
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
                )}
              </div>
              <div className={``} style={{ cursor: "pointer" }}>
                <p
                  dangerouslySetInnerHTML={{
                    __html: selectQuestion.textOptionsB,
                  }}
                ></p>
                {/* {selectQuestion.imageOptionsB && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}${selectQuestion.imageOptionsB}`}
                    alt="Option B"
                    className="img-fluid "
                    style={{ maxWidth: "200px" }}
                  />
                )} */}
              </div>
              <div className=" mt-2">
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
              </div>
            </div>
            {/* </div> */}

            {/* Option C */}
            {/* <div className="d-flex justify-content-center align-items-center flex-row gap-4 flex-wrap"> */}
            <div className="col-6 mb-3">
              <div className="d-flex flex-row gap-2 align-items-center">
                <h6 className="m-0 p-0">C.</h6>
                {selectQuestion.imageOptionsC && (
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
                )}
              </div>
              <div className={``} style={{ cursor: "pointer" }}>
                <p
                  dangerouslySetInnerHTML={{
                    __html: selectQuestion.textOptionsC,
                  }}
                ></p>
                {/* {selectQuestion.imageOptionsC && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}${selectQuestion.imageOptionsC}`}
                    alt="Option C"
                    className="img-fluid"
                    style={{ maxWidth: "200px" }}
                  />
                )} */}
              </div>
              <div className=" mt-2">
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
              </div>
            </div>

            {/* Option D */}
            <div className="col-6 mb-3">
              <div className="d-flex flex-row gap-2 align-items-center">
                <h6 className="m-0 p-0">D.</h6>
                {selectQuestion.imageOptionsD && (
                  <FaImage
                    // src={process.env.NEXT_PUBLIC_BASE_URL + item.image}
                    // alt={`Left Option ${item.option}`}
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
                )}
              </div>
              <div className={``} style={{ cursor: "pointer" }}>
                <p
                  dangerouslySetInnerHTML={{
                    __html: selectQuestion.textOptionsD,
                  }}
                ></p>
                {/* {selectQuestion.imageOptionsD && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}${selectQuestion.imageOptionsD}`}
                    alt="Option D"
                    className="img-fluid"
                    style={{ maxWidth: "200px" }}
                  />
                )} */}
              </div>
              <div className="mt-2">
                <label htmlFor="optionD" className="form-check-label me-2">
                  Select D
                </label>
                <input
                  type="checkbox"
                  id="optionD"
                  className="form-check-input"
                  checked={selectedOptions.includes("D")}
                  onChange={() => handleCheckboxChange("D")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

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
          <div className="mx-10 d-flex justify-content-center">
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

export default SelecQuestion;
