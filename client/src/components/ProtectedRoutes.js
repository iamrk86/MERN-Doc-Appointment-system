import React, { useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setUser } from "../redux/userSlice";
import { hideLoading, showLoading } from "../redux/alertSlice";

const ProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getUser = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/users/getUserById",
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        dispatch(hideLoading());
        dispatch(setUser(res.data.data));
      } else {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      dispatch(hideLoading());
      localStorage.removeItem("token");
      navigate("/login");
      console.log(error);
    }
  };
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (!user) {
      getUser();
    }
  });
  if (localStorage && localStorage.getItem("token")) {
    return <div>{children}</div>;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoutes;
