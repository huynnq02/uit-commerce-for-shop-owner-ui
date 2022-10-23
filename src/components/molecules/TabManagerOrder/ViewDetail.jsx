import React, { useEffect, useState } from "react";
import Popup from "../../atoms/Popup/Popup";
import { doc, getDoc, collection, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";

const ViewDetail = ({ open, handleClose, title, dataRowSelected, orderStatus, orderId}) => {
  let itemTotal = 0;
  const _handleChangeStatus = async () => {
    if (orderStatus === 'Pending') {
      const newRef = doc(collection(db, 'listOrdered'), orderId);
      await updateDoc(newRef, {
        orderStatus: 'Dispatch',
      }).then(() => {
        console.log('Update Status: Dispatch');
        window.location.reload();
      });
    }else {
      const newRef = doc(collection(db, 'listOrdered'), orderId);
      await updateDoc(newRef, {
        orderStatus: 'Completed',
      }).then(() => {
        console.log('Update Status: Completed');
        window.location.reload();
      });
    }
  }

  return (
    <Popup
      open={open}
      handleClose={handleClose}
      title={title}
      dataRowSelected={dataRowSelected}
    >
      {dataRowSelected === undefined ? (
        <p>No data</p>
      ) : (
        <div className="containerPopup">
          {dataRowSelected.map((e, index) => {
            itemTotal += (e.itemPrice * e.productQuantities);
            return (
              <div className="containerItemPopup">
                <div>
                    <img src={e.itemImg} />
                    <div>
                    <h3>{e.itemName}</h3>
                    <p>x{e.productQuantities}</p>
                    </div>
                </div>
                <p className="containerItemPopup__itemTotal">{e.itemPrice} đ</p>
              </div>
            );
          })}
          <h3>Total: {itemTotal} đ</h3>
          {
            orderStatus === 'Completed' || orderStatus === 'Cancelled' ? (
              <button className="btnDisableUpdate">{orderStatus}</button>
            ) : (
              <button onClick={_handleChangeStatus} className="btnUpdate">{orderStatus}</button>
            )
          }
          
        </div>
      )}
    </Popup>
  );
};

export default ViewDetail;
