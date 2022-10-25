/**
 * Manage Categories Layout
 * file: Categories.jsx
 */
import React, { useState, useRef } from "react";
import { db } from "../../../firebase/firebase-config";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import "./Categories.scss";
import { DataGrid } from "@mui/x-data-grid";
import { CATEGORIES_COLUMNS } from "../../../constants";
import CategoriesManage from "../../atoms/CategoriesManage/CategoriesManage";
import CircularUnderLoad from "../../atoms/CircularLoading/CircularLoading";
import AlertMessage from "../../atoms/Alert/Alert";
import PropsType from "prop-types";
const Categories = ({ categories, onUpdate }) => {
  const [addCategory, setAddCategory] = useState({
    name: "",
    active: false,
  });
  const [viewCategory, setViewCategory] = useState({
    id: "",
    name: "",
    active: false,
  });
  const [open, setOpen] = useState(false);
  const [errorMess, setErrorMess] = useState("");
  const [openMess, setOpenMess] = useState(false);
  const [errorType, setErrorType] = useState("error");
  const elementRef = useRef(null);

  /**
   * handle when status of view data change
   * @private
   * @params none
   */
  const _handleChangeViewStatus = () => {
    setViewCategory({ ...viewCategory, ["active"]: !viewCategory.active });
  };

  /**
   * handle when name of view data change
   * @private
   * @params e
   */
  const _handleChangeViewName = (e) => {
    setViewCategory({ ...viewCategory, ["name"]: e.target.value });
  };

  /**
   * handle when status of add new data change
   * @private
   * @params none
   */
  const _handleChangeAddStatus = () => {
    setAddCategory({ ...addCategory, ["active"]: !addCategory.active });
  };

  /**
   * handle when name of add new data change
   * @private
   * @params e
   */
  const _handleChangeAddName = (e) => {
    setAddCategory({ ...addCategory, ["name"]: e.target.value });
  };

  /**
   * handle when submit new data to firebase
   * @private
   * @params none
   */
  const _handleAddNewCategory = () => {
    if (addCategory.name !== "") {
      setOpen(true);
      (async () => {
        const newRef = doc(collection(db, "categories"));
        await setDoc(newRef, {
          id: newRef.id,
          active: addCategory.active,
          name: addCategory.name,
        }).then(() => {
          setOpen(false);
          setErrorType("success");
          setErrorMess("Update success!");
          setOpenMess(true);
          elementRef.current?.scrollIntoView({ behavior: "smooth" });
          onUpdate();
          setAddCategory({
            name: "",
            active: false,
          });
        });
      })();
    } else {
      setErrorType("error");
      setErrorMess("Category name can not be empty!");
      setOpenMess(true);
      elementRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  /**
   * handle when submit update data
   * @private
   * @params none
   */
  const _handleUpdateCategory = () => {
    if (viewCategory.name !== "") {
      setOpen(true);
      (async () => {
        const newRef = doc(collection(db, `categories`), viewCategory.id);
        await updateDoc(newRef, {
          name: viewCategory.name,
          active: viewCategory.active,
        }).then(() => {
          setOpen(false);
          setErrorType("success");
          setErrorMess("Update success!");
          setOpenMess(true);
          elementRef.current?.scrollIntoView({ behavior: "smooth" });
          onUpdate();
          setViewCategory({
            id: "",
            name: "",
            active: false,
          });
        });
      })();
    } else {
      setErrorType("error");
      setErrorMess("Category name can not be empty!");
      setOpenMess(true);
      elementRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="categories">
      {/**Alert message */}
      <AlertMessage
        ref={elementRef}
        message={errorMess}
        open={openMess}
        type={errorType}
        handleOpen={() => {
          setOpenMess((prev) => !prev);
        }}
      />
      <div className="categories__container">
        <div className="categories__datagrid">
          {/**Loading */}
          <CircularUnderLoad open={open} />
          {/**DataGrid */}
          <div className="datatableTitle">Categories Dashboard</div>
          <DataGrid
            className="datagrid"
            rows={categories}
            columns={CATEGORIES_COLUMNS}
            onCellClick={(params) => {
              setViewCategory({
                id: params.row.id,
                name: params.row.name,
                active: params.row.active,
              });
            }}
            pageSize={9}
            rowsPerPageOptions={[9]}
          />
        </div>
        <div className="categories__info">
          <div className="categories__info__view">
            {/**View and update categories */}
            <CategoriesManage
              category={viewCategory}
              title={"View Category"}
              btnTitle={"Update"}
              onChangeStatus={_handleChangeViewStatus}
              onChangeName={_handleChangeViewName}
              onSubmit={_handleUpdateCategory}
            />
          </div>
          <hr></hr>
          <div className="categories__info__add">
            {/**Add categories */}
            <CategoriesManage
              category={addCategory}
              title={"Add New Category"}
              btnTitle={"Add"}
              onChangeStatus={_handleChangeAddStatus}
              onChangeName={_handleChangeAddName}
              onSubmit={_handleAddNewCategory}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
Categories.propsType = {
  categories: PropsType.array,
  onUpdate: PropsType.func,
};

Categories.defaulthProps = {
  categories: [],
  onUpdate: () => {},
};
export default Categories;
