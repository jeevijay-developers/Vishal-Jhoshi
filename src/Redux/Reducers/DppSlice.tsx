import { createSlice } from "@reduxjs/toolkit";
// Assuming DppStatus is an enum like: { SOLVED: 'solved', UNSOLVED: 'unsolved', ... }
// import { DppStatus } from "@/Types/DppMeta";

const initialState = {
  solvedDpps: [],
};

const DppSlice = createSlice({
  name: "DppSlice",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      // Expecting action.payload to be an object like { description: string, status: DppStatus }
      state.solvedDpps.push(action.payload);
    },
  },
});

export const { setQuestions } = DppSlice.actions;
export default DppSlice.reducer;
