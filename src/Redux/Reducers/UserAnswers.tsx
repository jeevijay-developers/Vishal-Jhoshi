// Import necessary functions from Redux Toolkit
import { submitTest } from "@/server/tests";
import { createSlice } from "@reduxjs/toolkit";
import { set } from "lodash";

// Initial state
const initialState = {
  questions: [
    {
      _id: "",
      questionIndex: 0,
      questionId: "",
      testId: "",
      userId: "",
      userAnswer: "",
      rightAnswer: "",
      questionStatus: "", // 'correct' or 'incorrect'
      marks: 0,
      subject: "",
      type: "",
      color: "red",
      timeTaken: 0,
      selectedOptions: [],
    },
  ],
  currentQuestion: "",
};

// Create a slice
const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    addQuestion: (state, action) => {
      const { questionIndex, ...newQuestion } = action.payload;
      const existingQuestionIndex = state.questions.findIndex(
        (q) => q.questionIndex === questionIndex
      );

      if (existingQuestionIndex !== -1) {
        // Update the existing question
        state.questions[existingQuestionIndex] = {
          ...state.questions[existingQuestionIndex],
          ...newQuestion,
        };
      } else {
        // Add a new question
        state.questions.push({ questionIndex, ...newQuestion });
      }
    },
    submitTestCompleted: (state) => {
      const data = JSON.parse(JSON.stringify(state.questions));
      submitTest(data);
    },
    resetQuestions: (state) => {
      state.questions = [
        {
          _id: "",
          questionIndex: 0,
          questionId: "",
          testId: "",
          userId: "",
          userAnswer: "",
          rightAnswer: "",
          questionStatus: "",
          marks: 0,
          subject: "",
          type: "",
          color: "",
          timeTaken: 0,
          selectedOptions: [],
        },
      ];
    },
    setCurrentQuestion: (state, action) => {
      state.currentQuestion = action.payload;
    },
  },
});

// Export actions
export const {
  addQuestion,
  submitTestCompleted,
  resetQuestions,
  setCurrentQuestion,
} = questionSlice.actions;

// Export reducer
export default questionSlice.reducer;
