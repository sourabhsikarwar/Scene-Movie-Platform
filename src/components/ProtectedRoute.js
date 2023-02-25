import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/authContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
