import React from "react";
import Sidebar from "../../molecules/Sidebar/Sidebar";
import Navbar from "../../molecules/Navbar/Navbar";
import DataGridView from "../../molecules/DataGridView/DataGridView";
import "../List/List.scss";
const ListProduct = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DataGridView />
      </div>
    </div>
  );
};

export default ListProduct;
