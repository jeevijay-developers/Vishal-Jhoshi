import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  testId: "", // Holds the test ID
  physics: 0, // Individual physics question count
  chemistry: 0, // Individual chemistry question count
  maths: 0, // Individual maths question count
  biology: 0, // Individual biology question count
};

const testDetailsSlice = createSlice({
  name: "testDetails",
  initialState,
  reducers: {
    setTestId: (state, action) => {
      state.testId = action.payload; // Update the test ID
    },
    setPhysicsCount: (state) => {
      state.physics = state.physics + 1; // Update physics count
    },
    setChemistryCount: (state) => {
      state.chemistry = state.chemistry + 1; // Update chemistry count
    },
    setMathsCount: (state) => {
      state.maths = state.maths + 1; // Update maths count
    },
    setBiologyCount: (state) => {
      state.biology = state.biology + 1; // Update biology count
    },
    setBulkUploadCount: (state, action) => {
      console.log(action.payload);

      state.physics = action.payload.physics ?? 0;
      state.chemistry = action.payload.chemistry ?? 0;
      state.maths = action.payload.maths ?? 0;
      state.biology = action.payload.biology ?? 0;
    },
    resetCounts: (state) => {
      state.physics = 0;
      state.chemistry = 0;
      state.maths = 0;
      state.biology = 0;
    },
  },
});

export const {
  setTestId,
  setPhysicsCount,
  setChemistryCount,
  setMathsCount,
  setBiologyCount,
  resetCounts,
  setBulkUploadCount,
} = testDetailsSlice.actions;

export default testDetailsSlice.reducer;
