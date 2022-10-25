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

  if (adminInfo) {
    // admin is signed in
    return <Outlet />;
  } else {
    // No user is signed in.
    return <Navigate to="/login" />;
  }
}
