import React, { useContext } from "react";
import { Route, Navigate, Routes, useLocation } from "react-router-dom";
import { UserContext } from "./Context/UserContext/UserContext";
import {Outlet} from "react-router-dom/dist"
export default function PrivateRoute({ children, ...rest }) {
  let { isLogin } = useContext(UserContext);
  return isLogin ? <Outlet/> : <Navigate to="/login" />;
}
