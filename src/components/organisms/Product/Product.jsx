/**
 * Add Product component
 * file: Product.jsx
 */
import React, { useState, useRef } from "react";
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
import AlertMessage from "../../atoms/Alert/Alert";
import "./Product.scss";

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
  const [errorMess, setErrorMess] = useState("");
  const [openMess, setOpenMess] = useState(false);
  const [errorType, setErrorType] = useState("error");
  const elementRef = useRef(null);

  /**
   * handle validate inputs
   * @private
   * @params none
   */
  const _handleValidation = () => {
    if (!productInfor.name) {
      setErrorMess(`Product name can not be empty!`);
      return false;
    } else if (productInfor.price < 0 || !productInfor.price) {
      setErrorMess(`Price can not be empty!`);
      return false;
    } else if (productInfor.quantities < 0 || !productInfor.quantities) {
      setErrorMess(`Quantities can not be empty!`);
      return false;
    } else if (productInfor.sales < 0 || productInfor.sales === null) {
      setErrorMess(`Sales can not be empty!`);
      return false;
    } else if (!descriptions) {
      setErrorMess(`Description can not be empty!`);
      return false;
    } else if (!category) {
      setErrorMess(`Category can not be empty!`);
      return false;
    } else if (sizes.length === 0) {
      setErrorMess(`Size can not be empty!`);
      return false;
    } else if (colors.length === 0) {
      setErrorMess(`Colors can not be empty!`);
      return false;
    } else if (!displayImage) {
      setErrorMess(`Display Image can not be empty!`);
      return false;
    } else if (detailImages.length === 0) {
      setErrorMess(`Detail Images Image can not be empty!`);
      return false;
    } else {
      return true;
    }
  };

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

  /**
   * handle when submit the data to firebase
   * @private
   * @params none
   */
  const _handleSubmit = () => {
    if (_handleValidation()) {
      setOpen(true);
      (async () => {
        const newRef = doc(collection(db, "products"));
        await setDoc(newRef, {
          id: newRef.id,
          active: active,
          category,
          color: colors,
          description: descriptions,
          name: productInfor.name,
          price: Number(productInfor.price),
          quantities: Number(productInfor.quantities),
          sales: Number(productInfor.sales),
          sold: 0,
          sizes: sizes,
        })
          .then(() => {
            let id = newRef.id;
            _handlePushImage(id).then(() => {
              _handlePushListImages(id).then(() => {
                setOpen(false);
                setErrorType("success");
                setErrorMess("Adding success!");
                setOpenMess(true);
                elementRef.current?.scrollIntoView({ behavior: "smooth" });
              });
            });
          })
          .catch((e) => {
            console.log(e);
          });
      })();
    } else {
      setErrorType("error");
      setOpenMess(true);
      elementRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  /**
   * handle when push image to storage and push image's link to firestore
   * @private
   * @params id
   */
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

  /**
   * handle when push list of detail image to storage and push images's link to firestore
   * @private
   * @params id
   */
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
      <AlertMessage
        ref={elementRef}
        message={errorMess}
        open={openMess}
        type={errorType}
        handleOpen={() => {
          setOpenMess((prev) => !prev);
        }}
      />
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
                    type={item.type}
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
