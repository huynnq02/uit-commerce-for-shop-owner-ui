import "./DataTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
const DataTable = ({ users }) => {
  // Data info user from firebase
  const userColumns = [
    { field: "id", headerName: "ID", headerClassName: "addColor", width: 150 },
    {
      field: "fullname",
      headerName: "User",
      headerClassName: "addColor",
      width: 250,
    },
    {
      field: "email",
      headerName: "Email",
      headerClassName: "addColor",
      width: 250,
    },

    {
      field: "age",
      headerName: "Age",
      headerClassName: "addColor",
      width: 100,
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "addColor",
      width: 200,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status}
          </div>
        );
      },
    },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      headerClassName: "addColor",
      width: 350,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/users/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">VIEW</div>
            </Link>
            <Link to={`/users/edit/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="editButton">EDIT</div>
            </Link>
          </div>
        );
      },
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
        <div className="datatableTitle">
          User Dashboard
        </div>
        <DataGrid
          className="datagrid"
          rows={users}
          columns={userColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
        />
      </div>
    </Box>
  );
};

export default DataTable;
