import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Body from "./components/Body";
import Login from "./components/auth/Login";
import Profile from "./components/profile/Profile";
import store from "./store/store";
import { Provider } from "react-redux";
import Feed from "./components/feed/Feed";
import ToastMessage from "./components/ToastMessage";

function App() {
  return (
    <>
      <Provider store={store}>
          <BrowserRouter basename="/">
            <Routes>
              <Route path="/" element={<Body />}>
                <Route path="/" element={<Feed />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/test" element={<Profile />} />
              </Route>
            </Routes>
          </BrowserRouter>
          <ToastMessage />
      </Provider>
    </>
  );
}

export default App;
