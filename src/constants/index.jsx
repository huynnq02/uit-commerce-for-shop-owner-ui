/**
 * Contain the constant values
 * file: constants/index.jsx
 */
import { Link } from "react-router-dom";
import "./constants.scss";
export const CATEGORIES = [
  "Quần Dài Form Tiêu Chuẩn",
  "Áo Khoác",
  "Áo Thun",
  "Áo Thun Form Rộng",
  "Áo Thun Form Tiêu Chuẩn",
  "Quần Short Form Trên Gối",
];
export const STATUS = ["active", "passive", "pending"];
export const STR_SIZES = ["S", "M", "L", "XL", "XXL"];

export const SIZES = [
  {
    name: "S",
    value: false,
  },
  {
    name: "M",
    value: false,
  },
  {
    name: "L",
    value: false,
  },
  {
    name: "XL",
    value: false,
  },
  {
    name: "XXL",
    value: false,
  },
];

export const INITIAL_VALUE = {
  name: "",
  price: 0,
  quantities: 0,
  sales: 0,
};

export const DATA_INPUT_PRODUCT = [
  {
    title: "Product name",
    name: "name",
    type: "text",
  },
  {
    title: "Product price",
    name: "price",
    type: "number",
  },
  {
    title: "Quantities",
    name: "quantities",
    type: "number",
  },
  {
    title: "Sale",
    name: "sales",
    type: "number",
  },
];

export const PRODUCT_COLUMNS = [
  { field: "id", headerClassName: "header-DG", headerName: "ID", width: 170 },
  {
    field: "name",
    headerName: "Product Name",
    headerClassName: "header-DG",
    width: 230,
    renderCell: (params) => {
      return <div className="cellWithImg">{params.row.name}</div>;
    },
  },
  {
    field: "price",
    headerName: "Price",
    headerClassName: "header-DG",
    width: 200,
  },

  {
    field: "category",
    headerName: "Category",
    headerClassName: "header-DG",
    width: 200,
  },
  {
    field: "active",
    headerName: "Status",
    headerClassName: "header-DG",
    width: 160,
    renderCell: (params) => {
      return (
        <div
          className={
            params.row.active
              ? `cellWithStatus active`
              : `cellWithStatus passive`
          }
        >
          {params.row.active ? "active" : "passive"}
        </div>
      );
    },
  },
  {
    field: "quantities",
    headerName: "Quantities",
    headerClassName: "header-DG",
    width: 160,
    renderCell: (params) => {
      return <div>{params.row.quantities}</div>;
    },
  },
  {
    field: "sales",
    headerName: "Sales (%)",
    headerClassName: "header-DG",
    width: 160,
    renderCell: (params) => {
      return <div>{params.row.sales}</div>;
    },
  },
];

export const ACTION_COLUMN = [
  {
    field: "action",
    headerName: "Action",
    headerClassName: "header-DG",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <Link
            to={`/products/${params.row.id}`}
            style={{ textDecoration: "none" }}
          >
            <div className="viewButton">View</div>
          </Link>
        </div>
      );
    },
  },
];

export const CATEGORIES_COLUMNS = [
  { field: "id", headerClassName: "header-DG", headerName: "ID", width: 200 },
  {
    field: "name",
    headerName: "Product Name",
    headerClassName: "header-DG",
    width: 250,
    renderCell: (params) => {
      return <div className="cellWithImg">{params.row.name}</div>;
    },
  },
  {
    field: "active",
    headerName: "Status",
    headerClassName: "header-DG",
    width: 200,
    renderCell: (params) => {
      return (
        <div
          className={
            params.row.active
              ? `cellWithStatus active`
              : `cellWithStatus passive`
          }
        >
          {params.row.active ? "active" : "passive"}
        </div>
      );
    },
  },
];

export const DATA_CHART = [
  { name: "January", Total: 1100},
  { name: "February", Total: 2100},
  { name: "March", Total: 820},
  { name: "April", Total: 1620},
  { name: "May", Total: 820},
  { name: "June", Total: 1720},
];

export const PRODUCT_INITITAL_VALUE = {
  active: true,
  category: "",
  color: [],
  name: "",
  description: "",
  detailImages: [],
  image: "",
  price: 0,
  quantities: 0,
  sales: 0,
  sizes: [],
  sold: 0,
};

export const TRANSACTIONS_COLUMN = [
  {
    field: "id",
    headerName: "Order ID",
    headerClassName: "addColor",
    width: 120,
  },
  {
    field: "userId",
    headerName: "User ID",
    headerClassName: "addColor",
    width: 120,
  },
  {
    field: "Total",
    headerName: "Total Product Price",
    headerClassName: "addColor",
    width: 200,
  },
  {
    field: "orderAddress",
    headerName: "Order Address",
    headerClassName: "addColor",
    width: 350,
  },
  {
    field: "orderDate",
    headerName: "Order Date",
    headerClassName: "addColor",
    width: 200,
  },
  {
    field: "orderStatus",
    headerName: "Order Status",
    headerClassName: "addColor",
    width: 200,
  },
  {
    field: "shippingTotal",
    headerName: "Shipping Price",
    headerClassName: "addColor",
    width: 450,
  },
];
