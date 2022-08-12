import React from "react";
import { Navigate } from "react-router-dom";
const ProtectedRoutes = ({ children }) => {
  if (localStorage && localStorage.getItem("token")) {
    return <div>{children}</div>;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoutes;
