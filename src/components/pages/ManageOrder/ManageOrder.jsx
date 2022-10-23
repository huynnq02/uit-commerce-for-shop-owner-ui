import React from "react";
import ManageOrderHeader from "../../molecules/ManageOrderHeader/ManageOrderHeader";
import TabManagerOrder from "../../molecules/TabManagerOrder/TabManagerOrder";
import Sidebar from "../../molecules/Sidebar/Sidebar";
import Navbar from "../../molecules/Navbar/Navbar";
const ManageOrder = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <ManageOrderHeader></ManageOrderHeader>
        <TabManagerOrder></TabManagerOrder>
      </div>
    </div>
  );
};


export default ManageOrder;
