import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState } from "react";
import { PRODUCT_COLUMNS, ACTION_COLUMN } from "../../../constants";
const DataGridView = () => {
  // Data for tesing
  const productsRows = [
    {
      id: 1,
      name: "Áo Thun Cổ Tròn Đơn Giản Y Nguyên Bản Ver90",
      price: 227000,
      category: "Áo thun",
      status: true,
      quantities: 21,
      sales: 0,
    },
    {
      id: 2,
      name: "Áo Thun Cổ Tròn Đơn Giản Y Nguyên Bản Ver90",
      price: 227000,
      category: "Áo thun",
      status: false,
      quantities: 21,
      sales: 0,
    },
    {
      id: 3,
      name: "Áo Thun Cổ Tròn Đơn Giản Y Nguyên Bản Ver90",
      price: 227000,
      category: "Áo thun",
      status: true,
      quantities: 21,
      sales: 0,
    },
    {
      id: 4,
      name: "Áo Thun Cổ Tròn Đơn Giản Y Nguyên Bản Ver90",
      price: 227000,
      category: "Áo thun",
      status: false,
      quantities: 21,
      sales: 0,
    },
    {
      id: 5,
      name: "Áo Thun Cổ Tròn Đơn Giản Y Nguyên Bản Ver90",
      price: 227000,
      category: "Áo thun",
      status: true,
      quantities: 21,
      sales: 0,
    },
    {
      id: 6,
      name: "Áo Thun Cổ Tròn Đơn Giản Y Nguyên Bản Ver90",
      price: 227000,
      category: "Áo thun",
      status: true,
      quantities: 21,
      sales: 0,
    },
    {
      id: 7,
      name: "Áo Thun Cổ Tròn Đơn Giản Y Nguyên Bản Ver90",
      price: 227000,
      category: "Áo thun",
      status: true,
      quantities: 21,
      sales: 0,
    },
    {
      id: 8,
      name: "Áo Thun Cổ Tròn Đơn Giản Y Nguyên Bản Ver90",
      price: 227000,
      category: "Áo thun",
      status: true,
      quantities: 21,
      sales: 0,
    },
    {
      id: 9,
      name: "Áo Thun Cổ Tròn Đơn Giản Y Nguyên Bản Ver90",
      price: 227000,
      category: "Áo thun",
      status: true,
      quantities: 21,
      sales: 0,
    },
    {
      id: 10,
      name: "Áo Thun Cổ Tròn Đơn Giản Y Nguyên Bản Ver90",
      price: 227000,
      category: "Áo thun",
      status: true,
      quantities: 21,
      sales: 0,
    },
    {
      id: 11,
      name: "Áo Thun Cổ Tròn Đơn Giản Y Nguyên Bản Ver90",
      price: 227000,
      category: "Áo thun",
      status: true,
      quantities: 21,
      sales: 0,
    },
  ];

  const [data, setData] = useState(productsRows);

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Product Dashboard
        <Link to="/products/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={PRODUCT_COLUMNS.concat(ACTION_COLUMN)}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    </div>
  );
};

export default DataGridView;
