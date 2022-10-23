import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { DataGrid } from "@mui/x-data-grid";
import { width } from "@mui/system";
import { Avatar } from "@mui/material";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";
import { OrderColumn, ActionColumn } from "./DataGridColumns";
import Popup from "../../../components/atoms/Popup/Popup";

// import icons and images
import manIcon from "../../../assets/icons/manIcon.png";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import greenIcon from "../../../assets/icons/greenDotIcon.png";
import greyIcon from "../../../assets/icons/greyDotIcon.png";
import redIcon from "../../../assets/icons/redDotIcon.png";
import downArrowIcon from "../../../assets/icons/downArrowIcon.png";
import settingsIcon from "../../../assets/icons/settingsIcon.png";
import trashCanIcon from "../../../assets/icons/trashCanIcon.png";
import infoIcon from "../../../assets/icons/infoIcon.png";
import cancelIcon from "../../../assets/icons/cancelledIcon.png";
import checkMarkIcon from "../../../assets/icons/checkMarkIcon.png";

// dummy data
const DataOrder = [
  {
    id: 1,
    userImg: manIcon,
    userName: "Brooklyn Zoe",
    userAddress: "302 Snider Street, RUTLAND, VT, 05701",
    orderDate: {
      date: 31,
      month: "Jul",
      year: 2022,
    },
    totalPrice: 64.0,
    orderStatus: "Pending",
    userId: "13142",
    action: 1,
    productId: [
      {
        productId: 1,
      },
      {
        productId: 2,
      },
    ],
  },
  {
    id: 2,
    userImg: manIcon,
    userName: "John McCormick",
    userAddress: "1096 Wiseman Street, CALMAR, IA, 52132",
    orderDate: {
      date: 1,
      month: "Aug",
      year: 2022,
    },
    totalPrice: 35.0,
    orderStatus: "Dispatch",
    userId: "13142",
    action: 1,
  },
  {
    id: 3,
    userImg: manIcon,
    userName: "Sandra Pugh",
    userAddress: "1640 Thorn Street, SALE CITY, GA, 98106",
    orderDate: {
      date: 2,
      month: "Aug",
      year: 2022,
    },
    totalPrice: 74.0,
    orderStatus: "Completed",
    userId: "13142",
    action: 1,
  },
  {
    id: 4,
    userImg: manIcon,
    userName: "Vernie Hart",
    userAddress: "3989 Oak Drive, DOVER, RE, 19906",
    orderDate: {
      date: 2,
      month: "Aug",
      year: 2022,
    },
    totalPrice: 82.0,
    orderStatus: "Pending",
    userId: "13142",
    action: 1,
  },
  {
    id: 5,
    userImg: manIcon,
    userName: "Mark Clark",
    userAddress: "1915 Augusta Park, NASSAU, NY, 12062",
    orderDate: {
      date: 3,
      month: "Aug",
      year: 2022,
    },
    totalPrice: 39.0,
    orderStatus: "Dispatch",
    userId: "13142",
    action: 1,
  },
  {
    id: 6,
    userImg: manIcon,
    userName: "Rebekah Foster",
    userAddress: "3445 Park Boulevard, BIOLA, CA, 93606",
    orderDate: {
      date: 3,
      month: "Aug",
      year: 2022,
    },
    totalPrice: 67.0,
    orderStatus: "Cancelled",
    userId: "13142",
    action: 1,
  },
];

// function render Status checker
const StatusCheckerRender = (props) => {
  if (props === "Dispatch") {
    return (
      <div className="containerDispatchStatus">
        <img src={greenIcon} alt="Dispatch Status" />
        <p>{props}</p>
      </div>
    );
  }
  if (props === "Completed") {
    return (
      <div className="containerCompletedStatus">
        <img src={greyIcon} alt="Completed Status" />
        <p>{props}</p>
      </div>
    );
  }
  if (props === "Cancelled") {
    return (
      <div className="containerCancelledStatus">
        <img src={cancelIcon} alt="Cancelled Status" />
        <p>{props}</p>
      </div>
    );
  } else {
    return (
      <div className="containerPendingStatus">
        <img src={redIcon} alt="Pending Status" />
        <p>{props}</p>
      </div>
    );
  }
};

// function render Tab Manage ORder
const TabManagerOrder = ({ props }) => {
  const [value, setValue] = useState("1");
  const [dataOrder, setDataOrder] = useState();
  const [dataUser, setDataUser] = useState();
  const [dataProduct, setDataProduct] = useState();
  const [dataOrderComplete, setDataOrderComplete] = useState();
  const [isFletchingData, setIsFletchingData] = useState(false);
  const [openLoading, setOpenLoading] = useState(true);
  const [openPopup, setOpenPopup] = useState(false);
  const [dataRowSelected, setDataRowSelected] = useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (isFletchingData === false) {
      _GetCollectionListOrder();
    }
  };
  const _handleClosePopup = () => {
    setOpenPopup((prev) => !prev);
  };
  const OnClickDelRow = (props) => {};
  const OnClickApprove = (props) => {};

  const OnClickInfoItem = (props) => {
    setDataRowSelected(props);
    setOpenPopup();
  };
  const ActionRender = (props) => {
    return (
      <div className="containerBtnActionDataGrid">

        <div onClick={OnClickInfoItem(props.productInfo)} className="btnOpen">
          <img src={infoIcon} alt="Setting Icon" />
        </div>
        {props.orderStatus == "Completed" ||
        props.orderStatus == "Cancelled" ? (
          <div className="btnNotLink">
            <img src={cancelIcon} alt="Approved Icon" />
          </div>
        ) : (
          <div className="btnLink">
            <img
              onClick={OnClickApprove(props)}
              src={checkMarkIcon}
              alt="Approved Icon"
            />
          </div>
        )}
        <div onClick={OnClickDelRow(props)} className="btnOpen">
          <img src={trashCanIcon} alt="Delete Icon" />
        </div>
      </div>
    );
  };

  // function call API from FireStore.
  const _GetCollectionListOrder = async () => {
    // get collection list order
    const _listOrderCollection = collection(db, "listOrdered");
    let _docsListOrders = await getDocs(_listOrderCollection);
    const docsListOrder = _docsListOrders.docs.map((doc) => {
      const data = doc?.data();
      return data;
    });
    setDataOrder(docsListOrder);

    //get collection list Products
    const _productsCollection = collection(db, "products");
    let _docsProducts = await getDocs(_productsCollection);
    const docsProducts = _docsProducts.docs.map((doc) => {
      const data = doc?.data();
      return data;
    });
    setDataProduct(docsProducts);

    // get collection list Users
    const _usersCollection = collection(db, "users");
    let _docsUser = await getDocs(_usersCollection);
    const docsUser = _docsUser.docs.map((doc) => {
      const data = doc?.data();
      return data;
    });
    setDataUser(docsUser);

    // -------------------------------- Format dataOrder --------------------------------
    if (
      dataOrder !== undefined &&
      dataProduct !== undefined &&
      dataUser !== undefined
    ) {
      // adding value for Total, shippingTotal, subTotal field
      dataOrder.map((element) => {
        if (element.productInfo !== null) {
          element.productInfo.map((_productInfo) => {
            dataProduct.map((_dataProduct) => {
              if (_productInfo.productId == _dataProduct.id) {
                _productInfo.itemImg = _dataProduct.image;
                _productInfo.itemName = _dataProduct.name;
                _productInfo.itemPrice = _dataProduct.price;
                element.subTotal =
                  _productInfo.productQuantities * _dataProduct.price;
                element.Total = element.subTotal + element.shippingTotal;
              }
            });
          });

          // adding userName, userImg field to data
          dataOrder.map((_dataOrder) => {
            dataUser.map((_dataUser) => {
              if (_dataOrder.userId == _dataUser.userId) {
                _dataOrder.userName = _dataUser.fullname;
                _dataOrder.userImg = _dataUser.avatarId;
                return _dataOrder;
              } else {
                console.log("No valid user");
              }
            });
          });
          setDataOrderComplete(dataOrder);
        } else {
          console.log(
            "Invalid value in productInfo: field productInfo is null"
          );
        }
      });
      setIsFletchingData(true);
      console.log(dataOrderComplete);
      return;
    } else {
      console.log("There are no data called from FireStore");
    }
  };

  // ------------ function render UI -------------
  // function render All order table
  const AllOrderStatus = (props) => {
    const columns = [
      {
        field: "id",
        type: "string",
        headerClassName: "__headerDataGrid",
        headerName: "ID",
        valueFormatter: ({ value }) => `${value}`,
        renderHeader: (params) => (
          <strong>
            <p>Id</p>
          </strong>
        ),
        flex: 1,
        // width: 150,
      },
      {
        field: "userImg",
        headerName: "Avatar",
        headerClassName: "__headerDataGrid",
        renderHeader: (params) => (
          <strong>
            <p>Avatar</p>
          </strong>
        ),
        renderCell: (params) => (
          <img
            style={{
              width: 40,
              height: 40,
              alignSelf: "center",
            }}
            src={params.row.userImg}
            alt="Avatar"
          />
        ),
        sortAble: false,
        editable: false,
        filterable: false,
        flex: 1.2,
      },
      {
        field: "userName",
        type: "string",
        headerName: "Name",
        headerClassName: "__headerDataGrid",
        renderHeader: (params) => (
          <strong>
            <p>Name</p>
          </strong>
        ),
        flex: 2,
        sortAble: true,
        editable: true,
        // width: 250,
      },
      {
        field: "orderAddress",
        type: "string",
        headerName: "Address",
        headerClassName: "__headerDataGrid",
        renderHeader: (params) => (
          <strong>
            <p>Address</p>
          </strong>
        ),
        flex: 3.3,
        editable: true,
        // width: 350,
      },
      {
        field: "orderDate",
        headerName: "Date",
        headerClassName: "__headerDataGrid",
        // valueFormatter: ({ value }) =>
        //   `${value.date} ${value.month} ${value.year}`,
        renderHeader: (params) => (
          <strong>
            <p>Date</p>
          </strong>
        ),
        flex: 1.5,
        editable: true,
        // width: 180,
      },
      {
        field: "Total",
        headerName: "Price",
        headerClassName: "__headerDataGrid",
        valueFormatter: ({ value }) => `${value} đ`,
        renderHeader: (params) => (
          <strong>
            <p>Price</p>
          </strong>
        ),
        flex: 2,
        editable: true,
        // width: 100,
      },
      {
        field: "orderStatus",
        headerName: "Status",
        headerClassName: "__headerDataGrid",
        // valueFormatter: ({ value }) => {
        //   if (value === "Pending") {
        //     return `${value}`;
        //   }
        //   if (value === "Completed") {
        //     return `${value}`;
        //   } else {
        //     return `${value}`;
        //   }
        // },
        flex: 2,
        editable: true,
        type: "singleSelect",
        valueOptions: ["Completed", "Pending", "Dispatch", "Cancelled"],
        renderHeader: (params) => (
          <strong>
            <p>Status</p>
          </strong>
        ),
        renderCell: (params) => {
          return StatusCheckerRender(params.row.orderStatus);
        },

        // width: 200,
      },
      {
        field: "action",
        sortAble: false,
        editable: false,
        filterable: false,
        headerClassName: "__headerDataGrid",
        flex: 2.3,
        renderHeader: (params) => (
          <strong>
            <p>Action</p>
          </strong>
        ),
        renderCell: (params) => {
          return ActionRender(params.row);
        },
        
      },
    ];
    const rows = [];
    if (props !== undefined) {
      for (let data of props) {
        rows.push(data);
      }
    }
    return isFletchingData === true ? (
      <Box
        sx={{
          height: "auto",
          width: "100%",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          disableColumnMenu={false}
          headerHeight={80}
          hideFooter={false}
          rowHeight={90}
          sx={{
            width: "100%",
            height: 650,
          }}
          checkboxSelection={false}
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 5 : 0,
          })}
        ></DataGrid>
      </Box>
    ) : (
      <p>Loading</p>
    );
  };

  // function render Dispatch orderStatus table
  const DispatchStatus = (props) => {
    const columns = [
      {
        field: "id",
        type: "number",
        headerClassName: "__headerDataGrid",
        headerName: "ID",
        valueFormatter: ({ value }) => `#${value}`,
        renderHeader: (params) => (
          <strong>
            <p>Id</p>
          </strong>
        ),
        flex: 1,
        // width: 150,
      },
      {
        field: "userImg",
        headerName: "Avatar",
        headerClassName: "__headerDataGrid",
        renderHeader: (params) => (
          <strong>
            <p>Avatar</p>
          </strong>
        ),
        renderCell: (params) => (
          <img
            style={{
              width: 40,
              height: 40,
              alignSelf: "center",
            }}
            src={params.row.userImg}
            alt="Avatar"
          />
        ),
        sortAble: false,
        editable: false,
        filterable: false,
        flex: 1.2,
      },
      {
        field: "userName",
        type: "string",
        headerName: "Name",
        headerClassName: "__headerDataGrid",
        renderHeader: (params) => (
          <strong>
            <p>Name</p>
          </strong>
        ),
        flex: 2,
        sortAble: true,
        editable: true,
        // width: 250,
      },
      {
        field: "userAddress",
        type: "string",
        headerName: "Address",

        headerClassName: "__headerDataGrid",
        renderHeader: (params) => (
          <strong>
            <p>Address</p>
          </strong>
        ),
        flex: 4,
        editable: true,
        // width: 350,
      },
      {
        field: "orderDate",
        headerName: "Date",
        headerClassName: "__headerDataGrid",
        // valueFormatter: ({ value }) =>
        //   `${value.date} ${value.month} ${value.year}`,
        renderHeader: (params) => (
          <strong>
            <p>Date</p>
          </strong>
        ),
        flex: 1.5,
        editable: true,
        // width: 180,
      },
      {
        field: "Total",
        headerName: "Price",
        headerClassName: "__headerDataGrid",
        valueFormatter: ({ value }) => `${value} đ`,
        renderHeader: (params) => (
          <strong>
            <p>Price</p>
          </strong>
        ),
        flex: 1.5,
        editable: true,
        // width: 100,
      },
      {
        field: "orderStatus",
        headerName: "Status",
        headerClassName: "__headerDataGrid",
        valueFormatter: ({ value }) => {
          if (value === "Pending") {
            return `${value}`;
          }
          if (value === "Completed") {
            return `${value}`;
          } else {
            return `${value}`;
          }
        },
        flex: 2,
        editable: true,
        type: "singleSelect",
        valueOptions: ["Completed", "Pending", "Dispatch", "Cancelled"],
        renderHeader: (params) => (
          <strong>
            <p>Status</p>
          </strong>
        ),
        renderCell: (params) => {
          return StatusCheckerRender(params.row.orderStatus);
        },

        // width: 200,
      },
      {
        field: "action",
        sortAble: false,
        editable: false,
        filterable: false,
        headerClassName: "__headerDataGrid",
        flex: 2.3,
        renderHeader: (params) => (
          <strong>
            <p>Action</p>
          </strong>
        ),
        renderCell: (params) => {
          return ActionRender(params.row);
        },
      },
    ];

    let row = [];
    if (props !== undefined) {
      for (let dataUser of props) {
        if (dataUser.orderStatus === "Dispatch") {
          row.push(dataUser);
        }
      }
    }
    return isFletchingData === true ? (
      <Box
        sx={{
          height: "auto",
          width: "100%",
        }}
      >
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={7}
          disableColumnMenu={false}
          headerHeight={80}
          rowHeight={80}
          hideFooter={false}
          sx={{
            width: "100%",
            height: 645,
          }}
          checkboxSelection={false}
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 5 : 0,
          })}
        ></DataGrid>
      </Box>
    ) : (
      <p>Loading...</p>
    );
  };

  // function render Pending orderStatus table
  const PendingStatus = (props) => {
    const columns = [
      {
        field: "id",
        type: "number",
        headerClassName: "__headerDataGrid",
        headerName: "ID",
        valueFormatter: ({ value }) => `#${value}`,
        renderHeader: (params) => (
          <strong>
            <p>Id</p>
          </strong>
        ),
        flex: 1,
        // width: 150,
      },
      {
        field: "userImg",
        headerName: "Avatar",
        headerClassName: "__headerDataGrid",
        renderHeader: (params) => (
          <strong>
            <p>Avatar</p>
          </strong>
        ),
        renderCell: (params) => (
          <img
            style={{
              width: 40,
              height: 40,
              alignSelf: "center",
            }}
            src={params.row.userImg}
            alt="Avatar"
          />
        ),
        sortAble: false,
        editable: false,
        filterable: false,
        flex: 1.2,
      },
      {
        field: "userName",
        type: "string",
        headerName: "Name",

        headerClassName: "__headerDataGrid",
        renderHeader: (params) => (
          <strong>
            <p>Name</p>
          </strong>
        ),
        flex: 2,
        sortAble: true,
        editable: true,
        // width: 250,
      },
      {
        field: "userAddress",
        type: "string",
        headerName: "Address",

        headerClassName: "__headerDataGrid",
        renderHeader: (params) => (
          <strong>
            <p>Address</p>
          </strong>
        ),
        flex: 3.3,
        editable: true,
        // width: 350,
      },
      {
        field: "orderDate",
        headerName: "Date",
        headerClassName: "__headerDataGrid",
        // valueFormatter: ({ value }) =>
        //   `${value.date} ${value.month} ${value.year}`,
        renderHeader: (params) => (
          <strong>
            <p>Date</p>
          </strong>
        ),
        flex: 1.5,
        editable: true,
        // width: 180,
      },
      {
        field: "Total",
        headerName: "Price",
        headerClassName: "__headerDataGrid",
        valueFormatter: ({ value }) => `${value} đ`,
        renderHeader: (params) => (
          <strong>
            <p>Price</p>
          </strong>
        ),
        flex: 1.5,
        editable: true,
        // width: 100,
      },
      {
        field: "orderStatus",
        headerName: "Status",
        headerClassName: "__headerDataGrid",
        valueFormatter: ({ value }) => {
          if (value === "Pending") {
            return `${value}`;
          }
          if (value === "Completed") {
            return `${value}`;
          } else {
            return `${value}`;
          }
        },
        flex: 2,
        editable: true,
        type: "singleSelect",
        valueOptions: ["Completed", "Pending", "Dispatch"],
        renderHeader: (params) => (
          <strong>
            <p>Status</p>
          </strong>
        ),
        renderCell: (params) => {
          return StatusCheckerRender(params.row.orderStatus);
        },

        // width: 200,
      },
      {
        field: "action",
        sortAble: false,
        editable: false,
        filterable: false,
        headerClassName: "__headerDataGrid",
        flex: 2.3,
        renderHeader: (params) => (
          <strong>
            <p>Action</p>
          </strong>
        ),
        renderCell: (params) => {
          return ActionRender(params.row);
        },
      },
    ];
    let row = [];
    if (props !== undefined) {
      for (let dataUser of props) {
        if (dataUser.orderStatus === "Pending") {
          row.push(dataUser);
        }
      }
    }
    return isFletchingData === true ? (
      <Box
        sx={{
          height: "auto",
          width: "100%",
        }}
      >
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={7}
          disableColumnMenu={false}
          headerHeight={80}
          rowHeight={80}
          hideFooter={false}
          sx={{
            width: "100%",
            height: 645,
          }}
          checkboxSelection={false}
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 5 : 0,
          })}
        ></DataGrid>
      </Box>
    ) : (
      <p>Loading...</p>
    );
  };

  // function render Completed orderStatus table
  const CompletedStatus = (props) => {
    const columns = [
      {
        field: "id",
        type: "number",
        headerClassName: "__headerDataGrid",
        headerName: "ID",
        valueFormatter: ({ value }) => `#${value}`,
        renderHeader: (params) => (
          <strong>
            <p>Id</p>
          </strong>
        ),
        flex: 1,
        // width: 150,
      },
      {
        field: "userImg",
        headerName: "Avatar",
        headerClassName: "__headerDataGrid",
        renderHeader: (params) => (
          <strong>
            <p>Avatar</p>
          </strong>
        ),
        renderCell: (params) => (
          <img
            style={{
              width: 40,
              height: 40,
              alignSelf: "center",
            }}
            src={params.row.userImg}
            alt="Avatar"
          />
        ),
        sortAble: false,
        editable: false,
        filterable: false,
        flex: 1.2,
      },
      {
        field: "userName",
        type: "string",
        headerName: "Name",

        headerClassName: "__headerDataGrid",
        renderHeader: (params) => (
          <strong>
            <p>Name</p>
          </strong>
        ),
        flex: 2,
        sortAble: true,
        editable: true,
        // width: 250,
      },
      {
        field: "userAddress",
        type: "string",
        headerName: "Address",

        headerClassName: "__headerDataGrid",
        renderHeader: (params) => (
          <strong>
            <p>Address</p>
          </strong>
        ),
        flex: 3.3,
        editable: true,
        // width: 350,
      },
      {
        field: "orderDate",
        headerName: "Date",
        headerClassName: "__headerDataGrid",
        // valueFormatter: ({ value }) =>
        //   `${value.date} ${value.month} ${value.year}`,
        renderHeader: (params) => (
          <strong>
            <p>Date</p>
          </strong>
        ),
        flex: 1.5,
        editable: true,
        // width: 180,
      },
      {
        field: "Total",
        headerName: "Price",
        headerClassName: "__headerDataGrid",
        valueFormatter: ({ value }) => `${value} đ`,
        renderHeader: (params) => (
          <strong>
            <p>Price</p>
          </strong>
        ),
        flex: 1.5,
        editable: true,
        // width: 100,
      },
      {
        field: "orderStatus",
        headerName: "Status",
        headerClassName: "__headerDataGrid",
        valueFormatter: ({ value }) => {
          if (value === "Pending") {
            return `${value}`;
          }
          if (value === "Completed") {
            return `${value}`;
          } else {
            return `${value}`;
          }
        },
        flex: 2,
        editable: true,
        type: "singleSelect",
        valueOptions: ["Completed", "Pending", "Dispatch", "Cancelled"],
        renderHeader: (params) => (
          <strong>
            <p>Status</p>
          </strong>
        ),
        renderCell: (params) => {
          return StatusCheckerRender(params.row.orderStatus);
        },

        // width: 200,
      },
      {
        field: "action",
        sortAble: false,
        editable: false,
        filterable: false,
        headerClassName: "__headerDataGrid",
        flex: 2.3,
        renderHeader: (params) => (
          <strong>
            <p>Action</p>
          </strong>
        ),
        renderCell: (params) => {
          return ActionRender(params.row);
        },
      },
    ];
    let row = [];
    if (props !== undefined) {
      for (let dataUser of props) {
        if (dataUser.orderStatus === "Completed") {
          row.push(dataUser);
        }
      }
    }
    return isFletchingData === true ? (
      <Box
        sx={{
          height: "auto",
          width: "100%",
        }}
      >
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={7}
          disableColumnMenu={false}
          headerHeight={80}
          rowHeight={80}
          hideFooter={false}
          sx={{
            width: "100%",
            height: 645,
          }}
          checkboxSelection={false}
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 5 : 0,
          })}
        ></DataGrid>
      </Box>
    ) : (
      <p>Loading...</p>
    );
  };

  // function render Cancelled Status table
  const CancelledStatus = (props) => {
    const columns = [
      {
        field: "id",
        type: "number",
        headerClassName: "__headerDataGrid",
        headerName: "ID",
        valueFormatter: ({ value }) => `#${value}`,
        renderHeader: (params) => (
          <strong>
            <p>Id</p>
          </strong>
        ),
        flex: 1,
        // width: 150,
      },
      {
        field: "userImg",
        headerName: "Avatar",
        headerClassName: "__headerDataGrid",
        renderHeader: (params) => (
          <strong>
            <p>Avatar</p>
          </strong>
        ),
        renderCell: (params) => (
          <img
            style={{
              width: 40,
              height: 40,
              alignSelf: "center",
            }}
            src={params.row.userImg}
            alt="Avatar"
          />
        ),
        sortAble: false,
        editable: false,
        filterable: false,
        flex: 1.2,
      },
      {
        field: "userName",
        type: "string",
        headerName: "Name",

        headerClassName: "__headerDataGrid",
        renderHeader: (params) => (
          <strong>
            <p>Name</p>
          </strong>
        ),
        flex: 2,
        sortAble: true,
        editable: true,
        // width: 250,
      },
      {
        field: "userAddress",
        type: "string",
        headerName: "Address",

        headerClassName: "__headerDataGrid",
        renderHeader: (params) => (
          <strong>
            <p>Address</p>
          </strong>
        ),
        flex: 3.3,
        editable: true,
        // width: 350,
      },
      {
        field: "orderDate",
        headerName: "Date",
        headerClassName: "__headerDataGrid",
        // valueFormatter: ({ value }) =>
        //   `${value.date} ${value.month} ${value.year}`,
        renderHeader: (params) => (
          <strong>
            <p>Date</p>
          </strong>
        ),
        flex: 1.5,
        editable: true,
        // width: 180,
      },
      {
        field: "Total",
        headerName: "Price",
        headerClassName: "__headerDataGrid",
        valueFormatter: ({ value }) => `${value} đ`,
        renderHeader: (params) => (
          <strong>
            <p>Price</p>
          </strong>
        ),
        flex: 1.5,
        editable: true,
        // width: 100,
      },
      {
        field: "orderStatus",
        headerName: "Status",
        headerClassName: "__headerDataGrid",
        valueFormatter: ({ value }) => {
          if (value === "Pending") {
            return `${value}`;
          }
          if (value === "Completed") {
            return `${value}`;
          }
          if (value === "Dispatch") {
            return `${value}`;
          } else {
            return `${value}`;
          }
        },
        flex: 2,
        editable: true,
        type: "singleSelect",
        valueOptions: ["Completed", "Pending", "Dispatch", "Cancelled"],
        renderHeader: (params) => (
          <strong>
            <p>Status</p>
          </strong>
        ),
        renderCell: (params) => {
          return StatusCheckerRender(params.row.orderStatus);
        },

        // width: 200,
      },
      {
        field: "action",
        sortAble: false,
        editable: false,
        filterable: false,
        headerClassName: "__headerDataGrid",
        flex: 2.3,
        renderHeader: (params) => (
          <strong>
            <p>Action</p>
          </strong>
        ),
        renderCell: (params) => {
          return ActionRender(params.row);
        },
      },
    ];
    let row = [];
    if (props !== undefined) {
      for (let dataUser of props) {
        if (dataUser.orderStatus === "Cancelled") {
          row.push(dataUser);
        }
      }
    }
    return isFletchingData === true ? (
      <Box
        sx={{
          height: "auto",
          width: "100%",
        }}
      >
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={7}
          disableColumnMenu={false}
          headerHeight={80}
          rowHeight={80}
          hideFooter={false}
          sx={{
            width: "100%",
            height: 645,
          }}
          checkboxSelection={false}
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 5 : 0,
          })}
        ></DataGrid>
      </Box>
    ) : (
      <p>Loading...</p>
    );
  };

  useEffect(() => {
    _GetCollectionListOrder();
    console.log("Done UseEffect");
    // const timeout = setTimeout(() => {
    //   if (isFletchingData === false) {
    //     _GetCollectionListOrder();
    //   }
    // }, 500);
    // if (isFletchingData === true) {
    //   return () => clearTimeout(timeout);
    // }
    // else {
    //   timeout;
    // }
  }, []);

  return (
    <Box
      sx={{
        width: "inherit",
        height: "inherit",
        paddingRight: "5%",
        paddingLeft: "5%",
        paddingTop: "1%",
      }}
    >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            TabIndicatorProps={{
              sx: { backgroundColor: "#2A254B", height: 2 },
            }}
            sx={{
              "& button": { fontSize: 12, fontWeight: 600 },
              "& button:active": { color: "#2A254B" },
            }}
            aria-label="lab API tabs example"
          >
            <Tab label="All order" value="1" />
            <Tab label="Dispatch" value="2" />
            <Tab label="Pending" value="3" />
            <Tab label="Completed" value="4" />
            <Tab label="Cancelled" value="5" />
          </TabList>
        </Box>
        <TabPanel
          value="1"
          children={AllOrderStatus(dataOrderComplete)}
        ></TabPanel>
        <TabPanel
          value="2"
          children={DispatchStatus(dataOrderComplete)}
        ></TabPanel>
        <TabPanel
          value="3"
          children={PendingStatus(dataOrderComplete)}
        ></TabPanel>
        <TabPanel
          value="4"
          children={CompletedStatus(dataOrderComplete)}
        ></TabPanel>
        <TabPanel
          value="5"
          children={CancelledStatus(dataOrderComplete)}
        ></TabPanel>
      </TabContext>
      <Popup
        open={openPopup}
        handleClose={_handleClosePopup}
        title="Order Detail"
      >
        {dataRowSelected === undefined ? (
          <p>No data</p>
        ) : (
          <div className="containerPopup">
            {dataRowSelected.forEach((e, index) => {
              console.log(openPopup);
              const itemTotal = e.itemPrice * e.productQuantities;
              return(
              <div className="containerItemPopup">
                <img src={e.itemImg} />
                <div>
                  <h3>{e.itemName}</h3>
                  <p>{e.productQuantities}</p>
                </div>
                <p>{itemTotal} đ</p>
              </div>
              )
            })}
          </div>
        )}
      </Popup>
    </Box>
  );
};

export default TabManagerOrder;
