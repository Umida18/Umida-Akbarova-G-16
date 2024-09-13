import { configureStore } from "@reduxjs/toolkit";
import companySlice from "./slices/companySlice";
import jobSlice from "./slices/jobSlice";

const store = configureStore({
  reducer: {
    job: jobSlice,
    company: companySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
