/**
 * Private routes
 * file: PrivateRoute.jsx
 */
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom/dist";
import { useAuth } from "./Context/AuthContext/AuthContext";
export default function PrivateRoute() {
  const { adminInfo } = useAuth();
  return <Navigate to="/login" />;
}
