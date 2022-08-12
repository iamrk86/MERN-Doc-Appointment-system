import React from "react";
import { Navigate } from "react-router-dom";
const PublicRoutes = ({ children }) => {
  if (localStorage && localStorage.getItem("token")) {
    return <Navigate to="/" />;
  } else {
    return <div>{children}</div>;
  }
};

export default PublicRoutes;
