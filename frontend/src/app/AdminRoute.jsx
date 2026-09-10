import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const { user, initialized } = useSelector((state) => state.auth);
  if (!initialized) {
   return <div>Loading...</div>;
  }
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/userdashboard" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
