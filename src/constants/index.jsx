import { Link } from "react-router-dom";
import "./constants.scss";
export const CATEGORIES = [
  "Quần Dài Form Tiêu Chuẩn",
  "Áo khoác",
  "Áo Thun",
  "Áo thun form rộng",
];
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
  { field: "id", headerClassName: "header-DG", headerName: "ID", width: 70 },
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
            params.row.status
              ? `cellWithStatus active`
              : `cellWithStatus passive`
          }
        >
          {params.row.status ? "active" : "passive"}
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
          <Link to="/products/view" style={{ textDecoration: "none" }}>
            <div className="viewButton">View</div>
          </Link>
        </div>
      );
    },
  },
];
