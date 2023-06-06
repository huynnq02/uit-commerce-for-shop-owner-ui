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
  onChangeSize,
  onChangeColor,
  onSubmit,
}) => {
  return (
    <div className="cate-manage">
      <div className="title">{title}</div>
      <div className="group-infor">
        <label>
          Category name:
          <input type="text" value={category?.name} onChange={onChangeName} />
        </label>
        <label>
          Size:
          <input type="number" value={category?.size} onChange={onChangeSize} />
        </label>
        <label>
          Color:
          <input type="text" value={category?.color} onChange={onChangeColor} />
        </label>
      </div>
      <ActiveStatus onChangeStatus={onChangeStatus} active={category?.active} />
      <div className="foot">
        <Button
          handleClick={onSubmit}
          content={btnTitle}
          backgroundColor="#2A254B"
          color="white"
          radius={5}
        />
      </div>
    </div>
  );
};

CategoriesManage.propTypes = {
  title: PropsType.string,
  btnTitle: PropsType.string,
  category: PropsType.shape({
    name: PropsType.string,
    size: PropsType.number,
    color: PropsType.string,
    active: PropsType.bool,
  }),
  onChangeStatus: PropsType.func,
  onChangeName: PropsType.func,
  onChangeSize: PropsType.func,
  onChangeColor: PropsType.func,
  onSubmit: PropsType.func,
};

CategoriesManage.defaultProps = {
  title: "",
  btnTitle: "",
  category: {
    name: "",
    size: 0,
    color: "",
    active: false,
  },
  onChangeStatus: () => {},
  onChangeName: () => {},
  onChangeSize: () => {},
  onChangeColor: () => {},
  onSubmit: () => {},
};

export default CategoriesManage;
