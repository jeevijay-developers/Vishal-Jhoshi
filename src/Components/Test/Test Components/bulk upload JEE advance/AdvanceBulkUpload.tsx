import { setTestId } from "@/Redux/Reducers/TestCounterSlice";
import { RootState } from "@/Redux/Store";
import {
  addIntegerQuestion,
  addSelectTypeQuestion,
  updateTestAttempt,
} from "@/server/tests";
import mammoth from "mammoth";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SelectAndAssertionType from "./questions/JEEAdvanceQuestions";
import { assert } from "console";
interface LiveTestFormProps {
  setTest: React.Dispatch<React.SetStateAction<any>>;
  setcreatedTest: React.Dispatch<React.SetStateAction<any>>;
}
const AdvanceBulkUpload: React.FC<LiveTestFormProps> = ({
  setTest,
  setcreatedTest,
}) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const liveTestId = useSelector(
    (state: RootState) => state.testCounter.testId
  );
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

  const handleSubmit = async () => {
    // uploadBulkQuestion(JSON.stringify(questions), liveTestId)
    //   .then((data) => {
    //     toast.success("upload successfully");
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
    questions.slice(0, questions.length).map((question: any) => {
      if (
        question.type === "SINGLE_CHOICE" ||
        question.type === "MULTIPLE_CHOICE"
      ) {
        addSelectTypeQuestion(question, liveTestId)
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            console.error(err);
          });
      } else if (question.type === "INTEGER" || question.type === "BOOLEAN") {
        addIntegerQuestion(question, liveTestId)
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });
  };

  // console.log(questions);
  const dispatch = useDispatch();
  function finishUploadTest() {
    // canAttempt = true
    // update the state to true
    updateTestAttempt(liveTestId)
      .then((data) => {
        setTest("TEST-LIST");
        setcreatedTest(null);
        dispatch(setTestId(""));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <>
      <div className="container mt-5">
        <h1 className="text-2xl font-bold mb-4">
          JEE Advance Bulk Question Upload (.docx)
        </h1>
        <input
          type="file"
          accept=".docx"
          onChange={handleFileChange}
          className="mb-4"
        />
        <p className="text-blue-600 mb-4">{message}</p>

        {questions.length > 0 && (
          <>
            <button
              onClick={handleSubmit}
              className="mb-6 px-4 py-2 bg-success text-white rounded hover:bg-green-700"
            >
              Upload All to Backend
            </button>

            {questions && questions.length > 0 && (
              <SelectAndAssertionType
                questions={questions}
                setQuestions={setQuestions}
              />
            )}
          </>
        )}
      </div>
      {/* <button
        type="submit"
        className="btn btn-danger"
        onClick={(e) => {
          finishUploadTest();
        }}
      >
        Finish
      </button> */}
      {/* <a href="mailto:example@example.com">
        <button>Send Mail</button>
      </a> */}
    </>
  );
};

export default AdvanceBulkUpload;
