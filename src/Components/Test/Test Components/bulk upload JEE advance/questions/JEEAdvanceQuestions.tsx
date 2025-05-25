import React from "react";
import { BlockMath, InlineMath } from "react-katex";

type Question = {
  description: string;
  questionHindi?: string;
  descriptionImage?: string;
  assertionEnglish?: string;

  textOptionsA: string;
  textOptionsB: string;
  textOptionsC: string;
  textOptionsD: string;
  optionsHindi?: string[];
  imageOptionsA?: string;
  imageOptionsB?: string;
  imageOptionsC?: string;
  imageOptionsD?: string;
  reason?: string;

  correctAnswer: string;
  marks: {
    correct: number;
    incorrect: number;
  };

  solutionEnglish?: string;
  solutionHindi?: string;
  type: string;
  subject: string;
};

type Props = {
  questions: Question[];
  setQuestions: (questions: Question[]) => void;
};

type ImageFieldKeys =
  | "descriptionImage"
  | "imageOptionsA"
  | "imageOptionsB"
  | "imageOptionsC"
  | "imageOptionsD";
const JEEAdvanceQuestions = ({ questions, setQuestions }: Props) => {
  // console.log(questions);
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
  const subjectCounts = questions.slice(1).reduce((acc, q) => {
    acc.set(q.subject, (acc.get(q.subject) || 0) + 1);
    return acc;
  }, new Map<string, number>());
  const subjectCountsArray = Array.from(subjectCounts.entries());
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    questionIndex: number,
    imageField: ImageFieldKeys
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedQuestions = [...questions];
      updatedQuestions[questionIndex + 1][imageField] = reader.result as string;
      setQuestions(updatedQuestions);
    };
    reader.readAsDataURL(file);
  };

  const handleImageRemove = (
    questionIndex: number,
    imageField: ImageFieldKeys
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex + 1][imageField] = "";
    setQuestions(updatedQuestions);
  };

  return (
    <ul className="m-0 p-0">
      <li className="mb-4 border-b">
        <h2 className="text-2xl font-bold mb-4">Questions:</h2>
        <p className="mb-2">
          Total number of questions: {questions.length - 1}
        </p>
        <table>
          <thead>
            <tr>
              <th className="border px-4 py-2">Subject</th>
              <th className="border px-4 py-2">No. of Questions</th>
            </tr>
          </thead>
          <tbody>
            {subjectCountsArray.map(([subject, count]) => (
              <tr key={subject}>
                <td className="border px-4 py-2">{subject}</td>
                <td className="border px-4 py-2">{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </li>

      {questions.slice(1).map((q, i) => (
        <li key={i} className="border rounded p-4 shadow">
          <h3 className="font-bold text-lg mb-1">Q{i + 1}:</h3>
          <p>
            <strong>Question:</strong> {renderTextWithLatex(q.description)}
          </p>
          {q.assertionEnglish && (
            <p>
              <strong>Assertion English : </strong>{" "}
              {renderTextWithLatex(q.assertionEnglish)}
            </p>
          )}
          {/* <p>
            <strong>Assertion English : </strong> {q.assertionEnglish}
          </p> */}

          <div className="mt-2">
            <label className="block mb-1 font-medium">
              Upload Question Image (optional):
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, i, "descriptionImage")}
              className="mb-2"
            />
            {q.descriptionImage && (
              <div>
                <img
                  src={q.descriptionImage}
                  alt={`Q${i + 1} image`}
                  style={{
                    maxWidth: "400px",
                  }}
                  className="max-w-xs mt-2 border rounded"
                />
                <button
                  onClick={() => handleImageRemove(i, "descriptionImage")}
                  className="mt-2 text-red-500"
                >
                  Remove Image
                </button>
              </div>
            )}
          </div>

          {/* Display only in case of SELECT Type */}
          {(q.type === "SINGLE_CHOICE" || q.type === "MULTIPLE_CHOICE") && (
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Options:</h4>
              {["A", "B", "C", "D"].map((optionLabel, idx) => {
                const imageField: ImageFieldKeys =
                  idx === 0
                    ? "imageOptionsA"
                    : idx === 1
                    ? "imageOptionsB"
                    : idx === 2
                    ? "imageOptionsC"
                    : "imageOptionsD";

                return (
                  <div key={idx} className="mb-3">
                    <p>
                      <strong>{optionLabel}:</strong>{" "}
                      {renderTextWithLatex(q[`textOptions${optionLabel}`])}
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, i, imageField)}
                    />
                    {q[imageField] && (
                      <div>
                        <img
                          src={q[imageField] as string}
                          alt={`Option ${optionLabel} image`}
                          className="max-w-xs mt-2 border rounded"
                          style={{
                            maxWidth: "250px",
                          }}
                        />
                        <button
                          onClick={() => handleImageRemove(i, imageField)}
                          className="mt-2 text-red-500"
                        >
                          Remove Image
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <p className="mt-2">
            <strong>Correct Answer:</strong> {q.correctAnswer}
          </p>
          {q.reason && (
            <p className="mt-2">
              <strong>Reason:</strong> {q.reason}
            </p>
          )}

          <p>
            <strong>Marks:</strong> +{q.marks.correct}, -{q.marks.incorrect}
          </p>
          <p>
            <strong>Type:</strong> {q.type}
          </p>
          <p>
            <strong>Subject:</strong> {q.subject}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default JEEAdvanceQuestions;
