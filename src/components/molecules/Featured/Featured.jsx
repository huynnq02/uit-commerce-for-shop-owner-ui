/**
 * Fetured component
 * file: Featured.jsx
 */
import "./Featured.scss";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { KeyboardArrowUpOutlined, MoreVertOutlined } from "@mui/icons-material";
import { KeyboardArrowDown } from "@mui/icons-material";
import { useSelector } from "react-redux";

const Featured = () => {
  const total_sales_today = useSelector(
    (state) => state.shop.total_sales_today
  );
  const total_sales_last_month = useSelector(
    (state) => state.shop.total_sales_last_month
  );
  const total_sales_last_week = useSelector(
    (state) => state.shop.total_sales_last_month
  );
  console.log("total_sales_today", total_sales_today);
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title"> Total Revenue</h1>
        <MoreVertOutlined fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={"70%"} strokeWidth="5" />
        </div>
        <p className="title">Total Sales made today</p>
        <p className="amount">{total_sales_today} VND</p>
        <p className="desc">
          Previous transcations processing. Last Payments may not be included.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult negative">
              <KeyboardArrowDown fontSize="small" />
              <div className="resultAmount">...</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlined fontSize="small" />
              <div className="resultAmount">{total_sales_last_week} VND</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlined fontSize="small" />
              <div className="resultAmount">{total_sales_last_month} VND</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
