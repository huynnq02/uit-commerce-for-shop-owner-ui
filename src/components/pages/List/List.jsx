import "./List.scss"
import Sidebar from "../../molecules/Sidebar/Sidebar"
import Navbar from "../../molecules/Navbar/Navbar"
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";
import DataTable from "../../organisms/DataTable/DataTable";

const List = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      const colRef = collection(db, "users");
      const snapshots = await getDocs(colRef);
      const docs = snapshots.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      setUsers(docs);
    })();
  }, []);
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DataTable users={users} />
      </div>
    </div>
  );
};

export default List;
