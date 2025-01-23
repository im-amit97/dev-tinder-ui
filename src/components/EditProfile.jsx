import React, { useEffect, useState } from "react";
import { UserCard } from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/redux/userSlice";

export const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [about, setAbout] = useState(user?.about);
  const [age, setAge] = useState(user?.age);
  const [gender, setGender] = useState(user?.gender);

  const handleSaveProfile = async () => {
    try {
      const payload = { firstName, lastName, photoUrl, about, age, gender };
      const editUser = await axios.patch(`${BASE_URL}/profile/edit`, payload, {
        withCredentials: true,
      });
      dispatch(addUser(editUser?.data?.data));
      alert(editUser?.data?.message);
    } catch (err) {
      alert(err?.response?.data?.error);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="flex justify-center mx-10">
        <div className="card bg-base-300 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">First Name:</span>
              </div>
              <div className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e?.target?.value)}
                />
              </div>
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Last Name:</span>
              </div>
              <div className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e?.target?.value)}
                />
              </div>
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Photo URL:</span>
              </div>
              <div className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  name="photoUrl"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e?.target?.value)}
                />
              </div>
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Age:</span>
              </div>
              <div className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  name="age"
                  value={age}
                  onChange={(e) => setAge(e?.target?.value)}
                />
              </div>
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Gender</span>
              </div>
              <div className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e?.target?.value)}
                />
              </div>
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">About:</span>
              </div>
              <div className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  name="about"
                  value={about}
                  onChange={(e) => setAbout(e?.target?.value)}
                />
              </div>
            </label>
            <div className="card-actions justify-center my-4">
              <button className="btn btn-primary" onClick={handleSaveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserCard user={{ firstName, lastName, age, gender, about, photoUrl }} />
    </div>
  );
};
