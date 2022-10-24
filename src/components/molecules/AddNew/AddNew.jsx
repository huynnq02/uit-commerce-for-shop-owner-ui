/**
 * Add new component
 * file: AddNew.jsx
 */
import "./AddNew.scss";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import PropsType from "prop-types";
const AddNew = ({ children, title }) => {
  return (
    <div className="new">
      <Sidebar />

      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">{children}</div>
      </div>
    </div>
  );
};
AddNew.propsType = {
  children: PropsType.node,
  title: PropsType.string,
};
AddNew.defaultProps = {
  children: null,
  title: "",
};
export default AddNew;
