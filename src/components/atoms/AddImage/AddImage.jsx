import React, { useEffect, useState } from "react";
import Popup from "../Popup/Popup";
import "./AddImage.scss";
import PropsType from "prop-types";
const AddImage = ({ handleChangeImage, displayImage }) => {
  const [image, setImage] = useState(displayImage);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (typeof displayImage === "string") {
      setImage(displayImage);
    }
  }, [displayImage]);
  /**
   * handle when select other files
   * @private
   * @params event
   */
  const _handleUpdateFile = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    handleChangeImage(e.target.files[0]);
    reader.readAsDataURL(e.target.files[0]);
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
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.dataTransfer.files[0]);
  };

  /**
   * handle close/open the popup
   * @private
   * @params none
   */
  const _handleClose = () => {
    setOpen((prev) => !prev);
  };
  return (
    <div className="add-image">
      <label>Image Display:</label>
      <div className="img-display">
        <div
          className="button"
          onDragOver={_dragOver}
          onDragEnter={_dragEnter}
          onDragLeave={_dragLeave}
          onDrop={_fileDrop}
        >
          <label htmlFor="upload-list-photo">
            <span>Drag file here</span>
            or
            <span>Click to browse</span>
          </label>
          <input
            type="file"
            accept="image/*"
            id="upload-list-photo"
            onChange={_handleUpdateFile}
          ></input>
        </div>
        {image !== "" ? <img onClick={_handleClose} src={image} /> : null}
      </div>
      <Popup open={open} handleClose={_handleClose} title="Review image">
        <img src={image} />
      </Popup>
    </div>
  );
};
AddImage.propsType = {
  displayImage: PropsType.object,
  handleChangeImage: PropsType.func,
};

AddImage.defaultProps = {
  displayImage: "",
  handleChangeImage: () => {},
};
export default AddImage;
