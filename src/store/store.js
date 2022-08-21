import { configureStore } from "@reduxjs/toolkit";
import adminsSlice from "./admin-slice";
import authSlice from "./auth-slice";
import customerSlice from "./customer-slice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    customer: customerSlice,
    admins: adminsSlice,
  },
});
