import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { BASE_URL } from '../../utils/constants';
import axios from 'axios';
import { showToast } from '../../store/toastSlice';

const ForgotPassword = () => {
 const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailId, setEmailId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error,setError] = useState("");
  const handleLogin = async () => {
    setError("")
    if(newPassword.toString() !== confirmPassword.toString()){
        return setError("Password Mismatch !!")
    }
    try {
      await axios.patch(BASE_URL + "/forgot/password", {
        emailId,
        newPassword,
        confirmPassword
      });
      navigate("/login")
      dispatch(
        showToast({
          type: "success",
          message: "Password Reset Successful!!",
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
              <label className="label">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="input"
                placeholder="Password"
              />
              <label className="label">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input"
                placeholder="Password"
              />
              <p className="text-red-500">{error}</p>
              <button className="btn btn-neutral mt-4" onClick={handleLogin}>
                Reset Password
              </button>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword