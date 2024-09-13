import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { companyData } from "../../data/data";
import { ICompany } from "../../type/type";

const companySlice = createSlice({
  name: "company",
  initialState: {
    company: companyData,
  },
  reducers: {
    setCompany: (state, action: PayloadAction<ICompany[]>) => {
      state.company = action.payload;
    },
  },
});

export const { setCompany } = companySlice.actions;
export default companySlice.reducer;
