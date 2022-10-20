import "./Table.scss";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

//Table for Transactions information in admin dashboard and view info user
const Table = ({ orders }) => {
  const ordersColumns = [
    { field: "id", headerName: "Order ID", headerClassName: "addColor", width: 120 },
    { field: "userId", headerName: "User ID", headerClassName: "addColor", width: 120 },
    {
      field: "Total",
      headerName: "Total Product Price",
      headerClassName: "addColor",
      width: 150,
    },
    {
      field: "orderAddress",
      headerName: "Order Address",
      headerClassName: "addColor",
      width: 250,
    },
    {
      field: "orderDate",
      headerName: "Order Date",
      headerClassName: "addColor",
      width: 150,
    },
    {
      field: "orderStatus",
      headerName: "Order Status",
      headerClassName: "addColor",
      width: 150,
    },
    {
      field: "shippingTotal",
      headerName: "Shipping Price",
      headerClassName: "addColor",
      width: 150,
    },
   
  ];
  const productColumns = [
    {
      field: "name",
      headerName: "Product Name",
      headerClassName: "addColor",
      width: 250,
    },
  ];

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
          columns={ordersColumns}
          pageSize={7}
          rowsPerPageOptions={[7]}
        />
      </div>
    </Box>
  );
};

export default Table;
