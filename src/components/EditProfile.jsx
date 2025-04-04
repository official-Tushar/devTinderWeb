import React from "react";
import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [gender, setGender] = useState(user.gender);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState(user.skills);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const updateProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
          skills,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
    }
  };

  return (
    <div>
      <div className="flex my-10 gap-5">
        <div className="flex justify-center">
          <div className="card card-border bg-base-300 w-96">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <fieldset className="fieldset my-1">
                <legend className="fieldset-legend">First Name:</legend>
                <input
                  type="text"
                  value={firstName}
                  className="input"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset my-1">
                <legend className="fieldset-legend">Last Name:</legend>
                <input
                  type="text"
                  value={lastName}
                  className="input"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset my-1">
                <legend className="fieldset-legend">Photo URL:</legend>
                <input
                  type="text"
                  value={photoUrl}
                  className="input"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset my-1">
                <legend className="fieldset-legend">Gender:</legend>
                <input
                  type="text"
                  value={gender}
                  className="input"
                  onChange={(e) => setGender(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset my-1">
                <legend className="fieldset-legend">Age:</legend>
                <input
                  type="text"
                  value={age}
                  className="input"
                  onChange={(e) => setAge(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset my-1">
                <legend className="fieldset-legend">About:</legend>
                <input
                  type="text"
                  value={about}
                  className="input"
                  onChange={(e) => setAbout(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset my-1">
                <legend className="fieldset-legend">Skills:</legend>
                <input
                  type="text"
                  value={skills}
                  className="input"
                  onChange={(e) => setSkills(e.target.value)}
                />
              </fieldset>
                {error && <span className="text-red-500">{error}</span>}
              <div className="card-actions justify-center">
                <button className="btn btn-primary" onClick={updateProfile}>Update</button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <UserCard
            user={{ firstName, lastName, photoUrl, gender, age, about, skills }}
          />
        </div>
      </div>

      {showToast &&
        (<div className="toast toast-top toast-center">
            <div className="alert alert-success">
                <span>Profile updated successfully.</span>
            </div>
        </div>)
    }
    </div>
  );
};

export default EditProfile;
