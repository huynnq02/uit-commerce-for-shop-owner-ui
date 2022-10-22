import trashCanIcon from "../../../assets/icons/trashCanIcon.png";
import infoIcon from "../../../assets/icons/infoIcon.png";
import React from 'react'

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



export const OrderColumn = [
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
      
]



export const ActionColumn = [
    {
        field: 'Action',
        headerName: 'Action',
        headerClassName: '__headerDataGrid',
        flex: 2,
        renderCell: (params) =>{
            return (
                <div className="cellActionBtn">
                    <div className="btnMoreInfo">
                      <img src={infoIcon}/>
                    </div>
                    <div className="btnDelRow">
                      <img src={trashCanIcon}/>
                    </div>
                    <div className="btnChangeStatus">
                            Approve
                    </div>
                    ({params.row.orderStatus == 'Completed' || params.row.orderStatus == 'Cancelled'} ? (
                        <div className="btnDisableClick">
                            Approve
                        </div>    
                    ) : (
                        <div className="btnChangeStatus">
                            Approve
                        </div>
                    ))   
                    
                </div>
            );
        }
    }
]