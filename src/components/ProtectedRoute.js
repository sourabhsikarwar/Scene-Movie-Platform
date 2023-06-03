import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/authContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useUserAuth();
  if (loading) return <></>;
  else if (!loading && !user) {
    return <Navigate to="/login" />;
  } else return children;
};

export default ProtectedRoute;
