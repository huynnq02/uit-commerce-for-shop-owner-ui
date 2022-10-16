import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./scss/index.scss";
import { ThemeConfig } from "./theme/ThemeConfig";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import List from "./components/pages/List/List";
import New from "./components/pages/New/New";
import Single from "./components/pages/Single/Single";
import Login from "./components/pages/Login/Login";
import AddProduct from "./components/pages/AddProduct/AddProduct";
import { productInputs, userInputs } from "./formSource";
import ListProduct from "./components/pages/ListProduct/ListProduct";
import DetailProduct from "./components/pages/DetailProduct/DetailProduct";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={ThemeConfig}>
      <CssBaseline />
      <BrowserRouter>
        <App />
        <Routes>
          <Route path="/">
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="products">
              <Route index element={<ListProduct />} />
              <Route path=":productId" element={<DetailProduct />} />
              <Route path="new" element={<AddProduct />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
