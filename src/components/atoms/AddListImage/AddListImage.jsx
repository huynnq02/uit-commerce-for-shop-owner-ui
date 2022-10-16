import React, { useEffect, useState } from "react";
import Popup from "../Popup/Popup";
import CloseIcon from "@mui/icons-material/Close";
import "./AddListImage.scss";
import PropTypes from "prop-types";
const AddListImage = ({ listImages, handleChangeImage }) => {
  const [images, setImages] = useState(listImages);
  const [imageURLs, setImageURLs] = useState([]);
  const [img, setImg] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setImageURLs(() => []);
    if (images.length < 1) return;
    let newImageURLs = [];
    images.forEach((img) => {
      if (typeof img !== "string") {
        newImageURLs.push(URL.createObjectURL(img));
      } else {
        newImageURLs.push(img);
      }
    });
    setImageURLs(newImageURLs);
  }, [images]);

  /**
   * handle when change files images
   * @private
   * @params event
   */
  const _handleUpdateFile = (e) => {
    handleChangeImage(images.concat([...e.target.files]));
    setImages(images.concat([...e.target.files]));
  };

  /**
   * handle when drag files over
   * @private
   * @params event
   */
  const _dragOver = (e) => {
    e.preventDefault();
  };

  /**
   * handle when drag files enter the area
   * @private
   * @params event
   */
  const _dragEnter = (e) => {
    e.preventDefault();
  };

  /**
   * handle when drag files leave the area
   * @private
   * @params event
   */
  const _dragLeave = (e) => {
    e.preventDefault();
  };

  /**
   * handle when files droped into area
   * @private
   * @params event
   */
  const _fileDrop = (e) => {
    e.preventDefault();
    handleChangeImage(images.concat([...e.dataTransfer.files]));
    setImages(images.concat([...e.dataTransfer.files]));
  };

  /**
   * handle when click in an image in list files
   * @private
   * @params img
   */
  const _handleClickImage = (img) => {
    setImg(img);
    _handleClose();
  };

  /**
   * handle close/open the popup
   * @private
   * @params none
   */
  const _handleClose = () => {
    setOpen((prev) => !prev);
  };

  /**
   * handle delete the image from list
   * @private
   * @params none
   */
  const _handleDeleteImage = (index) => {
    let newImgs = [...images];
    let removeImgs = newImgs.splice(index, 1);

    setImages(newImgs);
    handleChangeImage(newImgs);
  };
  return (
    <div className="add-list-image">
      <label>Detail Images:</label>
      <div className="img-display">
        <div
          className="button"
          onDragOver={_dragOver}
          onDragEnter={_dragEnter}
          onDragLeave={_dragLeave}
          onDrop={_fileDrop}
        >
          <label htmlFor="upload-list-img">
            <span>Drag file here</span>
            or
            <span>Click to browse</span>
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            id="upload-list-img"
            onChange={_handleUpdateFile}
          ></input>
        </div>
        <div className="list-img">
          {imageURLs.map((item, index) => {
            return (
              <div key={index} className="img">
                <img
                  onClick={() => _handleClickImage(item)}
                  key={index}
                  src={item}
                />
                <div
                  className="round"
                  onClick={() => {
                    _handleDeleteImage(index);
                  }}
                >
                  <CloseIcon />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Popup open={open} handleClose={_handleClose} title="Review image">
        <img src={img} />
      </Popup>
    </div>
  );
};
AddListImage.propsType = {
  listImages: PropTypes.array,
  handleChangeImage: PropTypes.func,
};
AddListImage.defaultProps = {
  listImages: [],
  handleChangeImage: () => {},
};
export default AddListImage;
