import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/redux/feedSlice";
import { UserCard } from "./UserCard";

export const Feed = () => {
  const feeds = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const fetchFeed = async () => {
    try {
      const feed = await axios.get(`${BASE_URL}/user/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(feed?.data?.data));
    } catch (err) {
      alert(err?.response?.data?.error);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  if (!feeds) {
    return <div>Something went wrong...!</div>;
  }

  if (feeds.length === 0) {
    return (
      <div className="flex justify-center items-center my-20 font-extrabold">
        No Match Available
      </div>
    );
  }
  return (
    <div className="flex justify-center my-10">
      {feeds && <UserCard user={feeds[0]} />}
    </div>
  );
};
