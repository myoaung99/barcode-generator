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
    deleteCustomer: (state, actions) => {},
    setCustomer: (state, actions) => {
      state.customers = actions.payload;
    },
  },
});

export const { addCustomer, updateCustomer, deleteCustomer, setCustomer } =
  customerSlice.actions;

export default customerSlice.reducer;
