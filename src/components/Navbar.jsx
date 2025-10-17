import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../store/authSlice";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import { clearFeed } from "../store/feedSlice";
import { clearRequests } from "../store/requestsSlice";
import { removeConnections } from "../store/connectionSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.auth);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(clearFeed());
      dispatch(clearRequests());
      dispatch(removeConnections());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          🧑DevTinder
        </Link>
      </div>
      <div className="flex gap-2">
        {user ? (
          <div className="flex items-center">
            <div className="flex">Welcome, {user?.firstName}</div>
            <div className="dropdown dropdown-end mx-5">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={
                      user?.photoUrl ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/connections">Connections</Link>
                </li>
                <li>
                  <Link to="/requests">Requests</Link>
                </li>
                <li>
                  <Link onClick={handleLogout}>Logout</Link>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex gap-5 mr-2">
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
