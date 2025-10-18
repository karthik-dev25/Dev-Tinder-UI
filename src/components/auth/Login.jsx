import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/authSlice";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../../utils/constants";
import { showToast } from "../../store/toastSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState("");
  const handleLogin = async () => {
    try {
      const res = await axios.post(BASE_URL + "/login", {
        emailId,
        password,
      },{withCredentials:true});
      dispatch(addUser(res.data.data));
      navigate("/")
      dispatch(
        showToast({
          type: "success",
          message: "Login Successful!!",
        })
      );
    } catch (error) {
      setError(error?.response?.data);
    }
  };
  return (
    <div className="hero w-full">
      <div className="hero-content flex-col lg:flex-row-reverse w-full">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body w-full">
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="input"
                placeholder="Email"
              />
              <label className="label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="Password"
              />
              <p className="text-red-500">{error}</p>
              <div>
                <Link to="/forgotPassword" className="link link-hover">Forgot password?</Link>
              </div>
              <button className="btn btn-neutral mt-4" onClick={handleLogin}>
                Login
              </button>
              <div className="mt-4">
                Don't have an account ? <Link to="/signup" className="link link-hover text-blue-400">Sign Up</Link>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
