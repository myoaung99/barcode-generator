import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customerData: {
    customers: [],
    total: 0,
    totalPage: 0,
  },
};

export const customerSlice = createSlice({
  name: "customerSlice",
  initialState,
  reducers: {
    addCustomer: (state, actions) => {
      state.customerData.customers.unshift(actions.payload);
      state.customerData.total += 1;
    },
    updateCustomer: (state, actions) => {},
    removeCustomer: (state, actions) => {
      state.customerData.customers = state.customerData.customers.filter(
        (customer) => customer.id !== actions.payload
      );
      state.customerData.total -= 1;
    },
    setCustomer: (state, actions) => {
      state.customerData.customers = actions.payload.customers;
      state.customerData.total = actions.payload.total;
    },
  },
});

export const { addCustomer, updateCustomer, removeCustomer, setCustomer } =
  customerSlice.actions;

export default customerSlice.reducer;
