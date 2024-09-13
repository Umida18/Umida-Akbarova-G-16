import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jobData } from "../../data/data";
import { IJob } from "../../type/type";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    job: jobData,
  },
  reducers: {
    setJob: (state, action: PayloadAction<IJob[]>) => {
      state.job = action.payload;
    },
  },
});

export const { setJob } = jobSlice.actions;
export default jobSlice.reducer;
