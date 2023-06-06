/**
 * Private routes
 * file: PrivateRoute.jsx
 */
import React from "react";
import { Outlet } from "react-router-dom/dist";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const isLoggedIn = useSelector((state) => state.shop.isLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}
