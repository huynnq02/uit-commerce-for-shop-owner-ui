import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./scss/index.scss";
import { ThemeConfig } from "./theme/ThemeConfig";
import { CssBaseline, ThemeProvider } from "@mui/material";
import {  BrowserRouter, Route, Routes  } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import List from "./components/pages/List/List";
import New from "./components/pages/New/New";
import Single from "./components/pages/Single/Single";
import Login from "./components/pages/Login/Login";
import { productInputs, userInputs } from "./formSource";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={ThemeConfig}>
      <CssBaseline />
      <BrowserRouter>
        <App />
        <Routes>
      <Route path="/"> 
      <Route path="/" element={<Home/>} />
      <Route path="login" element={<Login/>}/>
      <Route path="users">
        <Route index element={<List/>}/>
        <Route path=":userId" element={<Single/>}/>
        <Route path="new" element={<New inputs={userInputs} title="Add New User"/>}/>
      </Route>
      <Route path="products">
        <Route index element={<List/>}/>
        <Route path=":productId" element={<Single/>}/>
        <Route path="new" element={<New inputs={productInputs} title="Add New Product"/>}/>
      </Route>
      </Route>
    </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
