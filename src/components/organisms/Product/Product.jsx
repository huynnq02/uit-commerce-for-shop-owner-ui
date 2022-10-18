import React, { useState } from "react";
import "./Product.scss";
import { db, storage } from "../../../firebase/firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { INITIAL_VALUE, DATA_INPUT_PRODUCT } from "../../../constants";
import AddColor from "../../atoms/AddColor/AddColor";
import AddImage from "../../atoms/AddImage/AddImage";
import AddListImage from "../../atoms/AddListImage/AddListImage";
import AddDescription from "../../atoms/AddDescription/AddDescription";
import AddCategories from "../../atoms/AddCategories/AddCategories";
import AddSize from "../../atoms/AddSize/AddSize";
import ActiveStatus from "../../atoms/ActiveStatus/ActiveStatus";
import CircularUnderLoad from "../../atoms/CircularLoading/CircularLoading";
import Button from "../../atoms/Button/Button";

const Product = () => {
  const [descriptions, setDescriptions] = useState("");
  const [category, setCategory] = useState("");
  const [active, setActive] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [productInfor, setProductInfor] = useState(INITIAL_VALUE);
  const [displayImage, setDisplayImage] = useState();
  const [detailImages, setDetaiImages] = useState([]);
  const [colors, setColors] = useState([]);
  const [open, setOpen] = useState(false);
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
    setDetaiImages(listImages);
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
  const _handleSubmit = () => {
    setOpen(true);
    (async () => {
      const newRef = doc(collection(db, "products"));
      await setDoc(newRef, {
        active: active,
        category,
        color: colors,
        description: descriptions,
        name: productInfor.name,
        price: Number(productInfor.price),
        quantities: Number(productInfor.quantities),
        sales: 0,
        sold: 0,
        sizes: sizes,
      })
        .then(() => {
          let id = newRef.id;
          _handlePushImage(id).then(() => {
            _handlePushListImages(id).then(() => {
              setOpen(false);
            });
          });
        })
        .catch((e) => {
          console.log(e);
        });
    })();
  };
  const _handlePushImage = async (id) => {
    const promises = [];
    const storageRef = ref(storage, `product-images/${displayImage.name}`);
    promises.push(
      uploadBytesResumable(storageRef, displayImage).then((uploadResult) => {
        return getDownloadURL(uploadResult.ref);
      })
    );
    const photo = await Promise.all(promises);
    const newRef = doc(collection(db, "products"), id);
    await updateDoc(newRef, {
      image: photo[0],
    });
  };
  const _handlePushListImages = async (id) => {
    const promises = [];

    for (var i = 0; i < detailImages.length; i++) {
      const file = detailImages[i];
      if (file !== null) {
        const storageRef = ref(storage, `product-images/${file.name}`);

        promises.push(
          uploadBytesResumable(storageRef, file).then((uploadResult) => {
            return getDownloadURL(uploadResult.ref);
          })
        );
      }
    }
    const photos = await Promise.all(promises);
    const newRef = doc(collection(db, "products"), id);
    await updateDoc(newRef, {
      detailImages: photos,
    });
  };

  return (
    <div className="add-product">
      <CircularUnderLoad open={open} />
      <div className="add-product__container">
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
          <AddImage
            displayImage={displayImage}
            handleChangeImage={_handleChangeDisplayImage}
          />
          <AddListImage
            listImages={detailImages}
            handleChangeImage={_handleChangeDetailImage}
          />
        </div>
      </div>
      <div className="add-product__foot">
        <Button
          handleClick={_handleSubmit}
          backgroundColor={"#2A254B"}
          color={"white"}
          content="Submit"
          radius={5}
        />
      </div>
    </div>
  );
};

export default Product;
