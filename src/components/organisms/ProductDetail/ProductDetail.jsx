import React, { useState } from "react";
import AddListImage from "../../atoms/AddListImage/AddListImage";
import AddColor from "../../atoms/AddColor/AddColor";
import AddImage from "../../atoms/AddImage/AddImage";
import AddDescription from "../../atoms/AddDescription/AddDescription";
import AddCategories from "../../atoms/AddCategories/AddCategories";
import AddSize from "../../atoms/AddSize/AddSize";
import ActiveStatus from "../../atoms/ActiveStatus/ActiveStatus";
import "./ProductDetail.scss";
import { DATA_INPUT_PRODUCT } from "../../../constants";
const PRODUCT = {
  acitve: true,
  category: "Quần Dài Form Tiêu Chuẩn",
  color: ["black"],
  name: "Quần Tây Tối Giản HG17",
  description:
    "Chất liệu: Vải Quần Tây Thành phần: 82% polyester 14% rayon 4% spandex",
  detailImages: [
    "https://cdn2.yame.vn/pimg/quan-tay-y2010-hg17-0019806/01959bc5-3bda-7400-10d9-00176ef1bda7.jpg?w=800",
    "https://cdn2.yame.vn/pimg/quan-tay-y2010-hg17-0019806/36decd98-d058-7900-e7c0-00176ef1bdd7.jpg?w=800",
  ],
  image:
    "https://cdn2.yame.vn/pimg/quan-tay-y2010-hg17-0019806/a1c9cfea-0740-3500-49de-00176e52de84.jpg?w=800",
  price: 325000,
  quantities: 70,
  sales: 0,
  sizes: ["M", "L", "XL", "XXL"],
  sold: 0,
};
const ProductDetail = () => {
  const [product, setProduct] = useState(PRODUCT);

  /**
   * handle when value in group input change
   * @private
   * @params event
   */
  const _handleChangeValueInput = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  /**
   * handle when descriptions change value
   * @private
   * @params event
   */
  const _handleChangeDescriptions = (e) => {
    setProduct({ ...product, ["description"]: e.target.value });
  };

  /**
   * handle when select category value
   * @private
   * @params event
   */
  const _handleCategoryChange = (e) => {
    setProduct({ ...product, ["category"]: e.target.value });
  };

  /**
   * handle when change display images value
   * @private
   * @params image
   */
  const _handleChangeDisplayImage = (image) => {
    setProduct({ ...product, ["image"]: image });
  };

  /**
   * handle when change status
   * @private
   * @params none
   */
  const _handleChangeActiveStatus = () => {
    let newActive = !product.acitve;
    setProduct((prev) => {
      let newArr = { ...prev };
      newArr.acitve = newActive;
      return newArr;
    });
  };

  /**
   * handle when change detail images value
   * @private
   * @params imgs
   */
  const _handleAddImage = (imgs) => {
    setProduct((prev) => {
      let newArr = { ...prev };
      newArr.detailImages = imgs;
      return newArr;
    });
  };

  /**
   * handle when size change value
   * @private
   * @params sizes
   */
  const _handleChangeSizes = (sizes) => {
    setProduct((prev) => {
      let newArr = { ...prev };
      newArr.sizes = sizes;
      return newArr;
    });
  };

  /**
   * handle when change colors
   * @private
   * @params colors
   */
  const _handleChangeColor = (colors) => {
    setProduct({ ...product, ["color"]: colors });
  };

  return (
    <div>
      <div className="detail-product">
        <div className="detail-product__left">
          <form className="formInput">
            {DATA_INPUT_PRODUCT.map((item, index) => {
              return (
                <label key={index} className="formInput">
                  {item.title}:
                  <input
                    value={product[`${item.name}`]}
                    name={item.name}
                    type={item.type}
                    onChange={_handleChangeValueInput}
                  />
                </label>
              );
            })}
            {/* Change status */}
            <ActiveStatus
              active={product.acitve}
              onChangeStatus={_handleChangeActiveStatus}
            />
            {/* Add descriptions */}
            <AddDescription
              value={product.description}
              handleChange={_handleChangeDescriptions}
            />
            {/* Add category */}
            <AddCategories
              category={product.category}
              handleCategoryChange={_handleCategoryChange}
            />
            {/* Add sizes */}
            <AddSize sizes={product.sizes} handleChange={_handleChangeSizes} />
            {/* Add colors */}
            <AddColor
              colors={product.color}
              handleAddColors={_handleChangeColor}
            />
          </form>
        </div>
        <div className="detail-product__right">
          <AddImage
            displayImage={product.image}
            handleChangeImage={_handleChangeDisplayImage}
          />
          <AddListImage
            listImages={product.detailImages}
            handleChangeImage={_handleAddImage}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
