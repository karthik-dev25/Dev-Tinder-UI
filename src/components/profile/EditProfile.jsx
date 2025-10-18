import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { addUser } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { showToast } from "../../store/toastSlice";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "select a gender");
  const [about, setAbout] = useState(user?.about || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [error, setError] = useState("");

  const handleProfielSave = async () => {
    setError("")
    try {
      const payload = {
        firstName,
        lastName,
        age,
        gender,
        photoUrl,
        about,
      };
      const res = await axios.patch(BASE_URL + "/profile/edit", payload, {
        withCredentials: true,
      });
      dispatch(addUser(res.data.data));
      dispatch(
        showToast({
          type: "success",
          message: "Profile Saved Successfully!!",
        })
      );
    } catch (error) {
      setError(error?.response?.data);
    }
  };
  return (
      <div className="hero w-full mb-5">
        <div className="hero-content flex-col w-full">
          <div className="flex justify-center">
            <img
              className="w-45 h-45 rounded-full mt-2"
              src={photoUrl}
              alt="user photo"
            />
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0">
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
                <label className="label">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="input"
                  placeholder="Age"
                />
                <label className="label">Gender</label>
                <select
                  className="select"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option disabled={true} value="select a gender">Select a Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <label className="label">About</label>
                <textarea className="textarea" value={about} onChange={(e)=> setAbout(e.target.value)} placeholder="Bio"/>
                <label className="label">Photo Url</label>
                <input
                  type="text"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="input"
                  placeholder="Photo Url"
                />
                <p className="text-red-500">{error}</p>
                <button
                  className="btn btn-neutral mt-4"
                  onClick={handleProfielSave}
                >
                  Save Profile
                </button>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
  );
};

export default EditProfile;
