import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customers: [],
};

export const customerSlice = createSlice({
  name: "customerSlice",
  initialState,
  reducers: {
    addCustomer: (state, actions) => {},
    updateCustomer: (state, actions) => {},
    deleteCustomer: (state, action) => {},
    setCustomer: (state, action) => {},
  },
});

export const { addCustomer, updateCustomer, deleteCustomer, setCustomer } =
  customerSlice.actions;

export default customerSlice.reducer;
