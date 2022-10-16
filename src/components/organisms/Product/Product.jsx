import React, { useState } from "react";
import "./Product.scss";
import { SIZES, INITIAL_VALUE, DATA_INPUT_PRODUCT } from "../../../constants";
import AddColor from "../../atoms/AddColor/AddColor";
import AddImage from "../../atoms/AddImage/AddImage";
import AddListImage from "../../atoms/AddListImage/AddListImage";
import AddDescription from "../../atoms/AddDescription/AddDescription";
import AddCategories from "../../atoms/AddCategories/AddCategories";
import AddSize from "../../atoms/AddSize/AddSize";
import ActiveStatus from "../../atoms/ActiveStatus/ActiveStatus";

const Product = () => {
  const [descriptions, setDescriptions] = useState("");
  const [category, setCategory] = useState("");
  const [active, setActive] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [productInfor, setProductInfor] = useState(INITIAL_VALUE);
  const [displayImage, setDisplayImage] = useState();
  const [detailImages, setDetaiImages] = useState([]);
  const [colors, setColors] = useState([]);

  /**
   * handle when value in group input change
   * @private
   * @params event
   */
  const _handleChangeValueInput = (event) => {
    const { name, value } = event.target;
    setProductInfor({ ...productInfor, [name]: value });
  };

  /**
   * handle when descriptions change value
   * @private
   * @params event
   */
  const _handleChangeDescriptions = (e) => {
    setDescriptions(e.target.value);
  };

  /**
   * handle when size change value
   * @private
   * @params sizes
   */
  const _handleChangeSizes = (sizes) => {
    setSizes(sizes);
  };
  /**
   * handle when select category value
   * @private
   * @params event
   */
  const _handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  /**
   * handle when change detail images value
   * @private
   * @params listImages
   */
  const _handleChangeDetailImage = (listImages) => {
    setDetaiImages((prev) => [...prev, listImages]);
  };

  /**
   * handle when change display images value
   * @private
   * @params image
   */
  const _handleChangeDisplayImage = (image) => {
    setDisplayImage(image);
  };

  /**
   * handle when change status
   * @private
   * @params none
   */
  const _handleChangeActiveStatus = () => {
    setActive((prev) => !prev);
  };

  /**
   * handle when change colors
   * @private
   * @params colors
   */
  const _handleChangeColor = (color) => {
    setColors(color);
  };
  return (
    <div className="add-product">
      <div className="add-product__left">
        <form className="formInput">
          {DATA_INPUT_PRODUCT.map((item, index) => {
            return (
              <label key={index} className="formInput">
                {item.title}:
                <input
                  value={productInfor[`${item.name}`]}
                  name={item.name}
                  onChange={_handleChangeValueInput}
                />
              </label>
            );
          })}
          {/* Change status */}
          <ActiveStatus
            active={active}
            onChangeStatus={_handleChangeActiveStatus}
          />
          {/* Add descriptions */}
          <AddDescription
            value={descriptions}
            handleChange={_handleChangeDescriptions}
          />
          {/* Add category */}
          <AddCategories
            category={category}
            handleCategoryChange={_handleCategoryChange}
          />
          {/* Add sizes */}
          <AddSize sizes={sizes} handleChange={_handleChangeSizes} />
          {/* Add colors */}
          <AddColor colors={colors} handleAddColors={_handleChangeColor} />
        </form>
      </div>
      <div className="add-product__right">
        <AddImage displayImage={displayImage} handleChangeImage={_handleChangeDisplayImage} />
        <AddListImage
          listImages={detailImages}
          handleChangeImage={_handleChangeDetailImage}
        />
      </div>
    </div>
  );
};

export default Product;
