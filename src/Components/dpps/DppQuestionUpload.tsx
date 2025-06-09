import { RootState } from "@/Redux/Store";
import mammoth from "mammoth";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BlockMath, InlineMath } from "react-katex";
import SelectAndAssertionType from "../Test/Test Components/bulk upload JEE advance/questions/JEEAdvanceQuestions";
import {
  createIntegerDPPQuestion,
  createSelectDPPQuestion,
  publishDpp,
} from "@/server/tests";
import { toast } from "react-toastify";
import { Dispatch } from "@reduxjs/toolkit";
const DppQuestionUpload = ({
  dppId,
  handlePublishTest,
  setDppId,
}: {
  dppId: string;
  handlePublishTest: () => void;
  setDppId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.name.endsWith(".docx")) {
      setMessage("Please select a valid .docx file.");
      return;
    }

    const arrayBuffer = await file.arrayBuffer();
    try {
      const result = await mammoth.extractRawText({ arrayBuffer });
      const parsed = parseQuestions(result.value);
      console.log(parsed);

      setQuestions(parsed);
      setMessage(`Parsed ${parsed.length} questions.`);
    } catch (err) {
      console.error(err);
      setMessage("Failed to parse document.");
    }
  };

  const parseQuestions = (text: string) => {
    // Split based on "Subject" and ensure that the first block is not skipped.
    const blocks = text.split(/(?<=\n)Subject\s+/).filter(Boolean);

    return blocks.map((block) => {
      const get = (label: string) => {
        const regex = new RegExp(
          `${label}\\s+([\\s\\S]*?)(?=\\n\\w+\\s|$)`,
          "i"
        );
        const match = block.match(regex);
        return match && match[1] ? match[1].trim() : "";
      };

      return {
        subject: block.split(" ")[0].split("\n")[0]?.toUpperCase() ?? "", // Hardcoded or get("Subject") if needed
        description: get("Question English"),
        questionHindi: get("Question_hindi"),
        descriptionImage: "",
        assertionEnglish: get("Assertion English"),
        reason: get("Reason English"),
        type: get("Question Type")?.toUpperCase() ?? "",
        textOptionsA: get("Option1 English"), // Option A (Text)
        textOptionsB: get("Option2 English"), // Option B (Text)
        textOptionsC: get("Option3 English"), // Option C (Text)
        textOptionsD: get("Option4 English"), // Option D (Text)

        imageOptionsA: "",
        imageOptionsB: "",
        imageOptionsC: "",
        imageOptionsD: "",
        correctAnswer: get("Correct Answer"),
        marks: {
          correct: parseFloat(get("Correct Marks")) || 0,
          incorrect: parseFloat(get("Incorrect Marks")) || 0,
        },
        solutionEnglish: get("Solution English"),
        solutionHindi: get("Solution Hindi"),
      };
    });
  };

  const [questionUploaded, setQuestionUploaded] = useState(0);
  const handleSubmit = async () => {
    questions.slice(0, questions.length).map((question: any) => {
      // console.log(question);

      if (
        question.type === "SINGLE_CHOICE" ||
        question.type === "MULTIPLE_CHOICE"
      ) {
        createSelectDPPQuestion(question, dppId)
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            console.error(err);
          })
          .finally(() => {
            setQuestionUploaded((prev) => prev + 1);
          });
      } else if (question.type === "INTEGER" || question.type === "BOOLEAN") {
        createIntegerDPPQuestion(question, dppId)
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            console.error(err);
          })
          .finally(() => {
            setQuestionUploaded((prev) => prev + 1);
          });
      }
    });
  };

  return (
    <>
      <div className="container mt-5">
        <h1 className="text-2xl font-bold mb-4">DPP Upload (.docx)</h1>
        <input
          type="file"
          accept=".docx"
          onChange={handleFileChange}
          className="mb-4 rounded-2 bg-danger"
        />
        <p className="text-blue-600 mb-4">{message}</p>

        {questions.length > 0 && (
          <div className="">
            <div className="d-flex justify-content-center align-items-center gap-5">
              <button
                onClick={handleSubmit}
                className="mb-6 px-4 py-2 bg-success text-white rounded hover:bg-green-700"
              >
                {questionUploaded > 0 && questionUploaded < questions.length - 1
                  ? `Questions ${questionUploaded} Uploaded`
                  : " Upload All to Backend"}
              </button>
              <button
                onClick={handlePublishTest}
                className="mb-6 px-4 py-2 bg-danger text-white rounded hover:bg-green-700"
              >
                Finish Upload
              </button>
            </div>

            {questions && questions.length > 0 && (
              <SelectAndAssertionType
                questions={questions}
                setQuestions={setQuestions}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default DppQuestionUpload;
