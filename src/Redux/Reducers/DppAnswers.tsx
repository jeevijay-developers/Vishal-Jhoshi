import { createSlice } from "@reduxjs/toolkit";
import { DppStatus } from "@/Types/DppMeta";

const dppSolved = {
  description: "",
  status: "",
};

const DppSlice = createSlice({
  name: "DppSlice",
  initialState: [dppSolved],
  reducers: {
    setQuestions: (state, action) => {},
  },
});
