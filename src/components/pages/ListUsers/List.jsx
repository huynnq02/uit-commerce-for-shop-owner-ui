/**
 * Info User Dashboard page
 * file: List.jsx
 */
import "./List.scss";
import Sidebar from "../../molecules/Sidebar/Sidebar";
import Navbar from "../../molecules/Navbar/Navbar";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";
import DataTable from "../../organisms/DataTable/DataTable";
import { useSelector } from "react-redux";

const List = () => {
  const users = useSelector((state) => state.shop.customers);
  console.log("Customer: ", users);
  useEffect(() => {}, [users]);
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DataTable users={users} />
      </div>
    </div>
  );
};

export default List;
