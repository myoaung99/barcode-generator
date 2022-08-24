import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admins: [],
};

export const adminsSlice = createSlice({
  name: "adminsSlice",
  initialState,
  reducers: {
    addAdmin: (state, actions) => {
      state.admins.unshift(actions.payload);
    },
    removeAdmin: (state, actions) => {
      state.admins = state.admins.filter(
        (admin) => admin._id !== actions.payload
      );
    },
    setAdmins: (state, actions) => {
      state.admins = actions.payload;
    },
  },
});

export const { addAdmin, updateAdmin, removeAdmin, setAdmins } =
  adminsSlice.actions;

export default adminsSlice.reducer;
