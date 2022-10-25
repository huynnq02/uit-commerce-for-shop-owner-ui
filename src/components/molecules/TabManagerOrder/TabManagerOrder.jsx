/*
 * Tab manager order component
 * file: TabManagerOrder.jsx
 */
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { DataGrid } from "@mui/x-data-grid";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";
import ViewDetail from "./ViewDetail";

// import icons and images
import greenIcon from "../../../assets/icons/greenDotIcon.png";
import greyIcon from "../../../assets/icons/greyDotIcon.png";
import redIcon from "../../../assets/icons/redDotIcon.png";
import infoIcon from "../../../assets/icons/infoIcon.png";

// function render Status checker

const TabManagerOrder = () => {
  const [dataOrder, setDataOrder] = useState([]);
  const [value, setValue] = React.useState("1");
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopupChangeStatus, setOpenPopupChangeStatus] = useState(false);
  const [dataRowSelected, setDataRowSelected] = useState([]);
  const [dataRowSelectedChangeStatus, setDataRowSelectedChangeStatus] =
    useState([]);
  // columns for DataGrid table
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
      valueFormatter: ({ value }) => `${value}`,
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
        const onClick = () => {
          OnClickInfoItem(params.row);
        };
        const onClickApprove = () => {
          OnClickApproveItem(params.row);
        };
        const orderStatus = params.row.orderStatus;
        var _props = {
          onClick: onClick,
          onClickApprove: onClickApprove,
          orderStatus: orderStatus,
        };
        return ActionRender(_props);
      },
    },
  ];
  useEffect(() => {
    _getCollectionListOrdered();
  }, []);
  const _getCollectionListOrdered = async () => {
    const _listOrderCollection = collection(db, "listOrdered");
    let _docsListOrders = await getDocs(_listOrderCollection);
    const docsListOrder = _docsListOrders.docs.map((doc) => {
      const data = doc?.data();
      return data;
    });
    const _usersCollection = collection(db, "users");
    let _docsUser = await getDocs(_usersCollection);
    const docsUser = _docsUser.docs.map((doc) => {
      const data = doc?.data();
      return data;
    });
    const _productsCollection = collection(db, "products");
    let _docsProducts = await getDocs(_productsCollection);
    const docsProducts = _docsProducts.docs.map((doc) => {
      const data = doc?.data();
      return data;
    });
    docsListOrder.map((_dataOrder) => {
      docsUser.map((_dataUser) => {
        if (_dataOrder.userId == _dataUser.userId) {
          _dataOrder.userName = _dataUser.fullname;
          _dataOrder.userImg = _dataUser.avatarId;
          return _dataOrder;
        } else {
          console.log("No valid user");
        }
      });
    });

    docsListOrder.map((element) => {
      element.productInfo.map((_productInfo) => {
        docsProducts.map((_dataProduct) => {
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
    });

    setDataOrder(docsListOrder);
  };

  const OnClickInfoItem = (props) => {
    setDataRowSelected(props);
    setOpenPopup(true);
  };
  const OnClickApproveItem = (props) => {
    setDataRowSelectedChangeStatus(props);
    setOpenPopupChangeStatus(true);
  };
  const onCellEditCommitDataGrid = (cellData) => {
    console.log("onCellEditCommitDataGrid " + cellData.orderStatus);
  };

  const ActionRender = (props) => {
    return (
      <div className="containerBtnActionDataGrid">
        <button onClick={props.onClick}>
          <img src={infoIcon} alt="Setting Icon" />
        </button>
      </div>
    );
  };
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
    } else {
      return (
        <div className="containerPendingStatus">
          <img src={redIcon} alt="Pending Status" />
          <p>{props}</p>
        </div>
      );
    }
  };

  // function render All order table
  const AllOrderStatus = (props) => {
    const rows = props;
    return (
      <Box
        sx={{
          height: "auto",
          width: "100%",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={7}
          disableColumnMenu={false}
          headerHeight={80}
          hideFooter={false}
          rowHeight={80}
          sx={{
            width: "100%",
            height: 650,
          }}
          checkboxSelection={false}
          isCellEditable={(params) =>
            params.row.orderStatus !== "Completed" ||
            params.row.orderStatus === "Cancelled"
          }
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 5 : 0,
          })}
        ></DataGrid>
      </Box>
    );
  };

  // function render Dispatch orderStatus table
  const DispatchStatus = (props) => {
    let row = [];
    for (let dataUser of props) {
      if (dataUser.orderStatus === "Dispatch") {
        row.push(dataUser);
      }
    }
    return (
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
    );
  };

  // function render Pending orderStatus table
  const PendingStatus = (props) => {
    let row = [];
    for (let dataUser of props) {
      if (dataUser.orderStatus === "Pending") {
        row.push(dataUser);
      }
    }
    return (
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
    );
  };

  // function render Completed orderStatus table
  const CompletedStatus = (props) => {
    let row = [];
    for (let dataUser of props) {
      if (dataUser.orderStatus === "Completed") {
        row.push(dataUser);
      }
    }
    return (
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
    );
  };
  const CancelledStatus = (props) => {
    let row = [];
    if (props !== undefined) {
      for (let dataUser of props) {
        if (dataUser.orderStatus === "Cancelled") {
          row.push(dataUser);
        }
      }
    }
    return (
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
    );
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const _handleClosePopup = () => {
    setOpenPopup((prev) => !prev);
  };
  const _handleClosePopupChangeStatus = (props) => {
    setOpenPopupChangeStatus((prev) => !prev);
  };
  const _handleClosePopupWithAgreement = () => {
    setOpenPopupChangeStatus((prev) => !prev);
  };
  return (
    <Box sx={{ width: "inherit", height: "inherit", padding: "5%" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            TabIndicatorProps={{
              sx: { backgroundColor: "#2A254B", height: 2 },
            }}
            sx={{
              "& button": {
                fontSize: 12,
                fontFamily: "Satoshi",
                fontWeight: 600,
              },
              "& button:active": { color: "#2A254B" },
            }}
            aria-label="lab API tabs example"
          >
            <Tab label="All orders" value="1" />
            <Tab label="Dispatch" value="2" />
            <Tab label="Pending" value="3" />
            <Tab label="Completed" value="4" />
            <Tab label="Cancelled" value="5" />
          </TabList>
        </Box>
        <TabPanel value="1" children={AllOrderStatus(dataOrder)}></TabPanel>
        <TabPanel value="2" children={DispatchStatus(dataOrder)}></TabPanel>
        <TabPanel value="3" children={PendingStatus(dataOrder)}></TabPanel>
        <TabPanel value="4" children={CompletedStatus(dataOrder)}></TabPanel>
        <TabPanel value="5" children={CancelledStatus(dataOrder)}></TabPanel>
      </TabContext>
      <ViewDetail
        open={openPopup}
        handleClose={_handleClosePopup}
        title="Order Detail"
        dataRowSelected={dataRowSelected.productInfo}
        orderStatus={dataRowSelected.orderStatus}
        orderId={dataRowSelected.id}
      />
    </Box>
  );
};

export default TabManagerOrder;
