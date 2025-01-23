import React from "react";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/redux/feedSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants/constants";

export const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, age, gender, about, skills, photoUrl } =
    user;

    const handleSendRequest = async (status, userId) => {
      try {
        const sendRequest = await axios.post(
          `${BASE_URL}/request/send/${status}/${userId}`,
          {},
          { withCredentials: true }
        );

        alert(sendRequest?.data?.message);
        dispatch(removeFeed(_id));
      } catch (err) {
        alert(err?.response?.data?.error);
      }
    };
  return (
    <div className="card card-compact bg-base-300 w-96 shadow-xl">
      <figure>
        <img src={photoUrl} alt="Dev" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignored
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};
