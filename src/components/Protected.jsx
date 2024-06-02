import React from "react";
import { Navigate } from "react-router-dom";

function Protected({ children }) {
  const token = localStorage.getItem("token");

  if (token) {
    return children;
  } else {
    return <Navigate to="/log_in" />;
  }
}

export default Protected;
