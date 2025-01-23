import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/redux/requestSlice";

export const Requests = () => {
  const requests = useSelector((store) => store.request);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const requests = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      dispatch(addRequest(requests?.data?.data));
    } catch (err) {
      alert(err?.response?.data?.error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleRequest = async (status, _id) => {
    try {
      const requests = await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      alert(requests?.data?.message);
      dispatch(removeRequest(requests?._id));
    } catch (err) {
      alert(err?.response?.data?.error);
    }
  };

  if (!requests) {
    return <div>Error Page</div>;
  }

  if (requests?.length === 0) {
    return (
      <div className="flex justify-center items-center my-20 font-extrabold">
        No Requests Found
      </div>
    );
  }
  return (
    <div className="w-2/3 m-auto">
      <h1 className="text-center m-4 text-2xl font-bold text-white">
        Connection Request
      </h1>
      {requests?.map((request) => {
        const { _id, firstName, lastName, age, gender, photoUrl, about } =
          request?.fromUserId;
        return (
          <div
            key={firstName}
            className="card card-side bg-base-300 shadow-xl m-4"
          >
            <figure className="w-[30%]">
              <img
                className="w-full h-full"
                src={photoUrl}
                alt="Devloper Pic"
              />
            </figure>
            <div className="card-body w-[40%]">
              <h2 className="card-title text-blue-300 text-2xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            <div className="flex justify-end items-center">
              <div className="card-actions justify-end mx-2">
                <button
                  className="btn btn-primary"
                  onClick={() => handleRequest("rejected", _id)}
                >
                  Reject
                </button>
              </div>
              <div className="card-actions justify-end mx-2">
                <button
                  className="btn btn-secondary"
                  onClick={() => handleRequest("accepted", _id)}
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
