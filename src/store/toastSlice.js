import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "toast",
  initialState: null,
  reducers: {
    showToast: (state, action) => {
      return action.payload
    },
    hideToast:()=>{
      return null;
    }
  },
});

export const { showToast,hideToast } = toastSlice.actions;

export default toastSlice.reducer;
