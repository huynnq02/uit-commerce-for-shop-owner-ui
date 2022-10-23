/**
 * Add component
 * file: AddNew.jsx
 */
import "./AddNew.scss";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
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

export default AddNew;
