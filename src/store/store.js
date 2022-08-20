import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import customerSlice from "./customer-slice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    customer: customerSlice,
  },
});
