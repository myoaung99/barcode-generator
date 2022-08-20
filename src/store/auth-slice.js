import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    authenticate: (state, actions) => {
      localStorage.setItem("barcodeToken", actions.payload);
      state.token = actions.payload;
    },
    logoutUser: (state) => {
      localStorage.removeItem("barcodeToken");
      state.token = "";
    },
  },
});

export const { authenticate, logoutUser } = authSlice.actions;

export default authSlice.reducer;
