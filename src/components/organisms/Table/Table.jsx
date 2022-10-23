/**
 * Table for Transactions information in admin dashboard and view info user
 * file: Table.jsx
 */
import "./Table.scss";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import PropsType from "prop-types";
import { TRANSACTIONS_COLUMN } from "../../../constants";
const Table = ({ orders }) => {
  
  return (
    <Box
      sx={{
        width: "100%",
        "& .addColor": {
          backgroundColor: "#2A254B",
        },
      }}
    >
      <div className="datatable">
        <DataGrid
          className="datagrid"
          rows={orders}
          columns={TRANSACTIONS_COLUMN}
          pageSize={7}
          rowsPerPageOptions={[7]}
        />
      </div>
    </Box>
  );
};
Table.propsType = {
  order: PropsType.array,
};
Table.defaultProp = {
  order: [],
};
export default Table;
