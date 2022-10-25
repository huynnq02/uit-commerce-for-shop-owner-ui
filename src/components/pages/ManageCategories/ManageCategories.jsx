/**
 * Manage Categories Pages
 * file: ManageCategories.jsx
 */
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";
import Sidebar from "../../molecules/Sidebar/Sidebar";
import Navbar from "../../molecules/Navbar/Navbar";
import Categories from "../../organisms/Categories/Categories";

const ManageCategories = () => {
  const [categories, setCategory] = useState([]);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    (async () => {
      const colRef = collection(db, "categories");
      const snapshots = await getDocs(colRef);
      const docs = snapshots.docs.map((doc) => {
        const data = doc.data();
        return data;
      });
      setCategory(docs);
    })();
  }, [update]);

  /**
   * handle update table data
   * @private
   * @params none
   */
  const _handleSetUpdate = () => {
    setUpdate((prev) => !prev);
  };

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Categories categories={categories} onUpdate={_handleSetUpdate} />
      </div>
    </div>
  );
};

export default ManageCategories;
