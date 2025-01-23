import React, { useEffect } from "react";
import { NavBar } from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import { Footer } from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/redux/userSlice";

export const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store?.user);

  const fetchUser = async () => {
    try {
      const user = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      dispatch(addUser(user?.data?.data));
    } catch (err) {
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};
