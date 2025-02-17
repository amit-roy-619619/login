import React, { useContext } from "react";
import { Context } from "./main";
import { Navigate, Outlet } from "react-router-dom";
import Login from "./Login";

const PrivateRoute = () => {
  const { isAuthenticated } = useContext(Context);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
