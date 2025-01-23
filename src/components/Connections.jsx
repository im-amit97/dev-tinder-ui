import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/redux/connectionSlice";

export const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const connections = await axios.get(`${BASE_URL}/user/connection`, {
        withCredentials: true,
      });
      dispatch(addConnection(connections?.data?.data));
    } catch (err) {
      alert(err?.response?.data?.error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) {
    return <div>Error Page</div>;
  }

  if (connections?.length === 0) {
    return (
      <div className="flex justify-center items-center my-20 font-extrabold">
        No Connection Found
      </div>
    );
  }
  return (
    <div className="w-2/3 m-auto">
      <h1 className="text-center m-4 text-2xl font-bold text-white">Dev Family</h1>
      {connections.map((connection) => (
        <div
          key={connection?.firstName}
          className="card card-side bg-base-300 shadow-xl m-4"
        >
          <figure className="w-[30%]">
            <img
              className="w-full h-full"
              src={connection?.photoUrl}
              alt="Devloper Pic"
            />
          </figure>
          <div className="card-body w-[40%]">
            <h2 className="card-title text-blue-300 text-2xl">
              {connection?.firstName + " " + connection?.lastName}
            </h2>
            {connection?.age && connection?.gender && (
              <p>{connection?.age + ", " + connection?.gender}</p>
            )}
            <p>{connection?.about}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
