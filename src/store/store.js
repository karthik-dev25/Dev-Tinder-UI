import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import toastReducer from "./toastSlice";
import feedReducer from "./feedSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    toast: toastReducer,
    feed:feedReducer
  },
});

export default store;
