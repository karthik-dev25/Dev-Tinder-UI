import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "toast",
  initialState: {
    type: "Success",
    message: "Wow toast is here",
  },
  reducers: {
    showToast: (state, action) => {
      return action.payload;
    },
  },
});

export const { showToast } = toastSlice.actions;

export default toastSlice.reducer;
