/**
 * Manage Categories component
 * file: CategoriesManage.jsx
 */
import React from "react";
import "./CategoriesManage.scss";
import ActiveStatus from "../ActiveStatus/ActiveStatus";
import Button from "../Button/Button";
import PropsType from "prop-types";
const CategoriesManage = ({
  title,
  btnTitle,
  category,
  onChangeStatus,
  onChangeName,
  onSubmit,
}) => {
  return (
    <div className="cate-manage">
      <div className="title">{title}</div>
      <div className="group-infor">
        <label>
          Category name:
          <input type={"text"} value={category?.name} onChange={onChangeName} />
        </label>
      </div>
      <ActiveStatus onChangeStatus={onChangeStatus} active={category?.active} />
      <div className="foot">
        <Button
          handleClick={onSubmit}
          content={btnTitle}
          backgroundColor={"#2A254B"}
          color={"white"}
          radius={5}
        />
      </div>
    </div>
  );
};
CategoriesManage.propsType = {
  title: PropsType.string,
  btnTitle: PropsType.string,
  category: PropsType.object,
  onChangeStatus: PropsType.func,
  onChangeName: PropsType.func,
  onSubmit: PropsType.func,
};
CategoriesManage.defaultProps = {
  title: "",
  btnTitle: "",
  category: {},
  onChangeStatus: () => {},
  onChangeName: () => {},
  onSubmit: () => {},
};
export default CategoriesManage;
