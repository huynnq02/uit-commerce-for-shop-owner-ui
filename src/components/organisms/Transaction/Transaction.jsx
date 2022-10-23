/**
 * Detail Transaction of admin dashboard and view info user
 * file: Transaction.jsx
 */
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";
import Table from "../../organisms/Table/Table";

// Detail Transaction of admin dashboard and view info user
const Transaction = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    (async () => {
      const colRef = collection(db, "listOrdered");
      const snapshots = await getDocs(colRef);
      const docs = snapshots.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      setOrders(docs);
    })();
  }, []);
  return <Table orders={orders} />;
};

export default Transaction;
