import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customers: [],
};

export const customerSlice = createSlice({
  name: "customerSlice",
  initialState,
  reducers: {
    addCustomer: (state, actions) => {
      state.customers.unshift(actions.payload);
    },
    updateCustomer: (state, actions) => {},
    removeCustomer: (state, actions) => {
      state.customers = state.customers.filter(
        (customer) => customer.id !== actions.payload
      );
    },
    setCustomer: (state, actions) => {
      state.customers = actions.payload;
    },
  },
});

export const { addCustomer, updateCustomer, removeCustomer, setCustomer } =
  customerSlice.actions;

export default customerSlice.reducer;
