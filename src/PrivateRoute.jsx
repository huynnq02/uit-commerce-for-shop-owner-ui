/**
 * Private routes
 * file: PrivateRoute.jsx
 */
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./Context/UserContext/UserContext";
import { Outlet } from "react-router-dom/dist";
export default function PrivateRoute() {
  let { isLogin } = useContext(UserContext);
  return isLogin ? <Outlet /> : <Navigate to="/login" />;
}
