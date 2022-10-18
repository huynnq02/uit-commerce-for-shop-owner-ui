/**
 * DataGriview component
 * file: AddProduct.jsx
 */
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { PRODUCT_COLUMNS, ACTION_COLUMN } from "../../../constants";
import PropsType from "prop-types";
const DataGridView = ({ products }) => {
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
        rows={products}
        columns={PRODUCT_COLUMNS.concat(ACTION_COLUMN)}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    </div>
  );
};
DataGridView.propsType = {
  products: PropsType.array,
};

DataGridView.defaultProps = {
  products: [],
};
export default DataGridView;
