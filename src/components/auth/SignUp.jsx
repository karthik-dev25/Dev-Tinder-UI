import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../../utils/constants";
import { showToast } from "../../store/toastSlice";
import { addUser } from "../../store/authSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSignUp = async () => {
    try {
      const payload = {
        firstName,
        lastName,
        emailId,
        password,
      };
      const res = await axios.post(BASE_URL + "/signup", payload, {
        withCredentials: true,
      });
      dispatch(addUser(res.data.data));
      navigate("/profile");
      dispatch(
        showToast({
          type: "success",
          message: "Sign Up Successful!!",
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
              <label className="label">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input"
                placeholder="firstName"
              />
              <label className="label">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input"
                placeholder="Last Name"
              />
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
              <button className="btn btn-neutral mt-4" onClick={handleSignUp}>
                SignUp
              </button>
              <div className="mt-4">
                Already have an account ?{" "}
                <Link to="/login" className="link link-hover text-blue-400">
                  Login
                </Link>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
