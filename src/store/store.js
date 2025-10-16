import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import toastReducer from "./toastSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import requestsReducer from "./requestsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    toast: toastReducer,
    feed:feedReducer,
    connections:connectionReducer,
    requests:requestsReducer
  },
});

export default store;
