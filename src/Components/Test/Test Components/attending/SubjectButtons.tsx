import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/Store";
import { setCurrentQuestion } from "@/Redux/Reducers/UserAnswers";

interface Props {
  settestCounter: React.Dispatch<React.SetStateAction<number>>;
}

const SubjectButtons: React.FC<Props> = ({ settestCounter }) => {
  const test = useSelector((state: RootState) => state.answer);
  const questions = test.questions || [];
  console.log(test);

  // Group questions into separate arrays by subject dynamically
  const groupedBySubject = questions.reduce(
    (acc: { [key: string]: any[] }, question: any) => {
      const { subject } = question;

      // Initialize an array for this subject if it doesn't already exist
      if (!acc[subject]) acc[subject] = [];

      // Add the current question to the appropriate array
      acc[subject].push(question);

      return acc;
    },
    {}
  );

  // console.log("Grouped Questions by Subject:", groupedBySubject);

  // Counter for button numbering

  const attend = useSelector((state: RootState) => state.attend);
  const questtins = attend.Questions;
  const dispatch = useDispatch();
  function handleSubjectButtonClicked(id: string) {
    if (questtins && questtins.length > 0) {
      questtins.forEach((ques, idx) => {
        // console.log(ques);
        if (ques.questionId === id) {
          // console.log(id);
          // console.log(ques.questionId);

          // console.log(idx);
          settestCounter(idx);
        }
      });
    }
  }

  let counter = 0;
  return (
    <div
      className="d-flex flex-column gap-4 my-4"
      style={{
        maxHeight: "500px",
        overflow: "auto",
      }}
    >
      {/* Iterate through grouped subjects */}
      {Object.keys(groupedBySubject).map((subject) => (
        <div key={subject} className="d-flex flex-column gap-2">
          <h6 className="text-uppercase m-0">{subject}</h6>
          <div className="d-flex flex-row flex-wrap gap-3">
            {groupedBySubject[subject].map((question: any) => {
              counter++;
              return (
                <button
                  style={{
                    backgroundColor: `${question.color}`,
                    border: `${
                      question.questionId === test.currentQuestion
                        ? "2px solid green"
                        : "1px solid black"
                    }`,
                    padding: "0",
                    height: "30px",
                    width: "30px",
                    fontSize: "20px",
                  }}
                  key={question.questionId}
                  className="p-1 btn timesUp m-0 p-0"
                  onClick={() => {
                    handleSubjectButtonClicked(question.questionId);
                    dispatch(setCurrentQuestion(question.questionId));
                  }}
                >
                  {counter}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubjectButtons;
