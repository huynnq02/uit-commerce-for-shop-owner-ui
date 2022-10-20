import "./Widget.scss";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlineOutlined from "@mui/icons-material/PersonOutlineOutlined";
import AccountBalanceWalletOutLinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlined from "@mui/icons-material/MonetizationOnOutlined"; 
import { Link } from "react-router-dom";
// Info admin dashboard
const Widget = ({ type }) => {
  let data;

switch (type) {
    case "user":
        data = {
            title: "USERS",
            isMoney: false,
            link:             
            <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <span className="viewPage">See all users</span>
            </li>
            </Link>,
            number:"12",
            percentage:"30",
            icon: (
                <PersonOutlineOutlined 
                className="icon" 
                style={{
                    color: "crimson",
                    backgroundColor: " rgba(218,165,32,0.2)",
                }}
                 />
             ),
        };
        break;
        case "order":
            data = {
                title: "ORDERS",
                isMoney: false,
                link:             
                <Link to="/orders" style={{ textDecoration: "none" }}>
                <li>
                  <span className="viewPage">See all users</span>
                </li>
                </Link>,
                number:"8",
                percentage:"50",
                icon: (
                    <ShoppingCartOutlinedIcon className="icon" 
                    style={{
                        color: "goldenrod",
                        backgroundColor: " rgba(218,165,32,0.2)",
                    }}
                        />
                ),
            };
            break;
            case "earning":
                data = {
                    title: "EARNINGS",
                    isMoney: true,
                    link:           
                      <Link to="/products" style={{ textDecoration: "none" }}>
                    <li>
                      <span className="viewPage">View all products</span>
                    </li>
                    </Link>,
                    number:"220",
                    percentage:"40",
                    icon: (
                        <MonetizationOnOutlined className="icon" 
                        style={{
                            color: "green",
                            backgroundColor: " rgba(0,128,0,0.2)",
                        }}
                            />
                    ),
                };
                break;
                case "balance":
                    data = {
                        title: "BALANCE",
                        isMoney: true,
                        link: 
                        <Link to="/manage-categories" style={{ textDecoration: "none" }}>
                        <li>
                          <span className="viewPage">View all categories</span>
                        </li>
                        </Link>,
                        number:"430",
                        percentage:"30",
                        icon: (
                            <AccountBalanceWalletOutLinedIcon className="icon" 
                            style={{
                                color: "purple",
                                backgroundColor: " rgba(128,0,128,0.2)",
                            }}
                                />
                        ),
                    };
                    break;
               default:
                    break;
}

  return (
    <div className="widget">
      <div className="left">
            <span className="title">{data.title}</span>
            <span className="counter">{data.number}{data.isMoney && " Dollar"} </span>
            <span className="link">{data.link}</span>
      </div>
      <div className="right">
            <div className="percentage positive">
              <KeyboardArrowUp />
             {data.percentage} %
            </div>
        {data.icon}
      </div>
      
    </div>
  );

}

export default Widget
