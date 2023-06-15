/**
 * Detail Transaction of admin dashboard and view info user
 * file: Transaction.jsx
 */
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";
import Table from "../../organisms/Table/Table";
import { useDispatch, useSelector } from "react-redux";
import { getAPIActionJSON } from "../../../../api/ApiActions";

const Transaction = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const shopId = useSelector((state) => state.shop.id);
  const handleResponse = (response) => {
    if (!response.success) {
      Alert.alert(response.message);
      return;
    }
    console.log(response.data);
    setOrders(response.data);
  };
  const getOrdersData = () => {
    dispatch(
      getAPIActionJSON("get_shop_orders", null, null, `/${shopId}`, (e) =>
        handleResponse(e)
      )
    );
  };
  useEffect(() => {
    getOrdersData();
  }, [orders]);
  return <Table orders={orders} />;
};

export default Transaction;
