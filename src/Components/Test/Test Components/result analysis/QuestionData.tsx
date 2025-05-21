import { RootState } from "@/Redux/Store";
import { getQuestion } from "@/server/tests";
import React, { useEffect, useRef, useState } from "react";
import { GiStopwatch } from "react-icons/gi";
import { useSelector } from "react-redux";
import gsap from "gsap";
import "./result.css";
import { FcQuestions } from "react-icons/fc";
// import "bootstrap/dist/css/bootstrap.min.css";

interface QUESTIONS {
  marks: number;
  questionId: string;
  questionStatus: string;
  rightAnswer: string | any[];
  userAnswer: string | any[];
  subject: string;
  description: string;
  level: string;
  timeTaken: number;
  descriptionImage?: string;
  imageOptionsA?: string;
  imageOptionsB?: string;
  imageOptionsC?: string;
  imageOptionsD?: string;
  textOptionsA?: string;
  textOptionsB?: string;
  textOptionsC?: string;
  textOptionsD?: string;
  leftOptionsA?: string;
  leftOptionsB?: string;
  leftOptionsC?: string;
  leftOptionsD?: string;
  rightOptionsA?: string;
  rightOptionsB?: string;
  rightOptionsC?: string;
  rightOptionsD?: string;
  rightImagesA?: string;
  rightImagesB?: string;
  rightImagesC?: string;
  rightImagesD?: string;
}

const QuestionData: React.FC = () => {
  const chart = useSelector((state: RootState) => state.chart);
  const [question, setQuestion] = useState<QUESTIONS[]>([]);
  const questionRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    chart.forEach((c) => {
      getQuestion(c.questionId, c.type)
        .then((data) => {
          const baseData = {
            marks: c.marks,
            questionId: c.questionId,
            questionStatus: c.questionStatus,
            rightAnswer: c.rightAnswer,
            userAnswer: c.userAnswer,
            subject: c.subject,
            description: data.description,
            level: data.level,
            timeTaken: c.timeTaken,
          };

          if (c.type === "select") {
            setQuestion((prev) => [
              ...prev,
              {
                ...baseData,
                descriptionImage: data.descriptionImage || "",
                imageOptionsA: data.imageOptionsA || "",
                imageOptionsB: data.imageOptionsB || "",
                imageOptionsC: data.imageOptionsC || "",
                imageOptionsD: data.imageOptionsD || "",
                textOptionsA: data.textOptionsA,
                textOptionsB: data.textOptionsB,
                textOptionsC: data.textOptionsC,
                textOptionsD: data.textOptionsD,
              },
            ]);
          } else {
            setQuestion((prev) => [
              ...prev,
              {
                ...baseData,
                leftOptionsA: data.leftOptionsA,
                leftOptionsB: data.leftOptionsB,
                leftOptionsC: data.leftOptionsC,
                leftOptionsD: data.leftOptionsD,
                rightOptionsA: data.rightOptionsA,
                rightOptionsB: data.rightOptionsB,
                rightOptionsC: data.rightOptionsC,
                rightOptionsD: data.rightOptionsD,
                rightImagesA: data.rightImagesA || "",
                rightImagesB: data.rightImagesB || "",
                rightImagesC: data.rightImagesC || "",
                rightImagesD: data.rightImagesD || "",
              },
            ]);
          }
        })
        .catch((err) => {
          console.error(`Error fetching question ${c.questionId}:`, err);
        });
    });

    return () => {
      setQuestion([]);
    };
  }, [chart]);

  useEffect(() => {
    gsap.fromTo(
      questionRefs.current,
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.1,
        duration: 1,
        ease: "power2.out",
      }
    );
  }, [question]);

  return (
    <div className="question-list-container bg-white text-dark w-100">
      <h3
        className="title d-flex justify-content-center align-items-center py-2 px-5 w-fit mx-auto my-3"
        style={{
          borderRadius: "20px",
          // border: "2px solid yellow",
          // boxShadow:
          //   "2px 2px 5px #ee6a0066, inset -3px -3px 3px #ae9090c9, -3px -3px 3px #e1e1e16e, inset 3px 3px 2px #ff96001c",
        }}
      >
        {" "}
        <FcQuestions /> Question-wise analysis
      </h3>
      <div className="d-flex flex-lg-row flex-column flex-wrap gap-4 justify-content-center gy-5 align-items-center question-list">
        {question.length > 0 ? (
          question.map((q, index) => (
            <div
              key={q.questionId}
              className="w-full m-auto d-flex justify-content-center align-items-center position-relative my-4"
              style={{
                maxWidth: "500px",
              }}
              ref={(el) => {
                if (el) {
                  questionRefs.current[index] = el;
                }
              }}
            >
              <div className="question-card">
                <h6
                  className="question-description p-4 text-black"
                  dangerouslySetInnerHTML={{ __html: q.description }}
                ></h6>
                <div
                  className="d-flex justify-content-center align-items-center bg-primary flex-row"
                  // style={{ backgroundColor: "green" }}
                >
                  <div className="d-flex justify-content-center align-items-center flex-row flex-wrap gap-3 w-75 bg-primary">
                    <p className="m-0 p-0 d-flex flex-row gap-3 justify-content-center align-items-center">
                      <strong className="text-white">Subject:</strong>{" "}
                      <span style={{ color: "yellow" }}>{q.subject}</span>
                    </p>

                    <p className="m-0 p-0 d-flex flex-row gap-3 justify-content-center align-items-center">
                      <strong className="text-white">Status:</strong>{" "}
                      <span style={{ color: "yellow" }}>
                        {q.questionStatus}
                      </span>
                    </p>
                    <p className="m-0 p-0 d-flex flex-row gap-3 justify-content-center align-items-center">
                      <strong className="text-white">Marks:</strong>{" "}
                      <span style={{ color: "yellow" }}>{q.marks}</span>
                    </p>
                  </div>
                  <div
                    className="d-flex justify-content-center align-items-center gap-2 flex-row w-25 h-100"
                    style={{ backgroundColor: "green", padding: "3px" }}
                  >
                    <GiStopwatch
                      style={{ fontSize: "xxx-large", color: "white" }}
                    />
                    <p className="m-0 p-0 fw-semibold">
                      <strong className="text-white">Time Taken:</strong>{" "}
                      <span style={{ color: "yellow" }}>
                        {q.timeTaken / 1000} sec
                      </span>
                    </p>
                  </div>
                </div>
                <span className="circle position-absolute">{index + 1}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="no-questions">No questions available.</p>
        )}
      </div>
    </div>
  );
};

export default QuestionData;
