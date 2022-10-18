import "./DataTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState } from "react";
import Box from "@mui/material/Box";
const Datatable = () => {
  // Data for tesing
  const userColumns = [
    { field: "id", headerName: "ID", headerClassName: "addColor", width: 70 },
    {
      field: "user",
      headerName: "User",
      headerClassName: "addColor",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="avatar" />
            {params.row.username}
          </div>
        );
      },
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
  // Data for tesing
  const userRows = [
    {
      id: 1,
      username: "VietVuiVe",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      status: "active",
      email: "vietprovipwe@gmail.com",
      age: 21,
    },
    {
      id: 2,
      username: "TuyenPham",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "2snow@gmail.com",
      status: "passive",
      age: 42,
    },
    {
      id: 3,
      username: "KhanhHoangVu",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "3snow@gmail.com",
      status: "pending",
      age: 45,
    },
    {
      id: 4,
      username: "DuyLam",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "4snow@gmail.com",
      status: "active",
      age: 16,
    },
    {
      id: 5,
      username: "VanHung",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "5snow@gmail.com",
      status: "passive",
      age: 22,
    },
    {
      id: 6,
      username: "KhoaLang",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "6snow@gmail.com",
      status: "active",
      age: 15,
    },
    {
      id: 7,
      username: "HaiDang",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "7snow@gmail.com",
      status: "passive",
      age: 44,
    },
    {
      id: 8,
      username: "Frances",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "8snow@gmail.com",
      status: "active",
      age: 36,
    },
    {
      id: 9,
      username: "Roxie",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "snow@gmail.com",
      status: "pending",
      age: 65,
    },
    {
      id: 10,
      username: "Roxie",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "snow@gmail.com",
      status: "active",
      age: 65,
    },
  ];

  const [data, setData] = useState(userRows);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      headerClassName: "addColor",
      width: 350,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/view" style={{ textDecoration: "none" }}>
              <div className="viewButton">VIEW</div>
            </Link>
            <Link to="/users/edit" style={{ textDecoration: "none" }}>
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
          <Link to="/users/new" className="link">
            Add New
          </Link>
        </div>

        <DataGrid
          className="datagrid"
          rows={data}
          columns={userColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
        />
      </div>
    </Box>
  );
};

export default Datatable;
