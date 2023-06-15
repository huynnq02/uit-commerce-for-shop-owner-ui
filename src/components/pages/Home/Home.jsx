/**
 * Dashboard page
 * file: Home.jsx
 */
import Navbar from "../../molecules/Navbar/Navbar";
import Sidebar from "../../molecules/Sidebar/Sidebar";
import Widget from "../../molecules/Widget/Widget";
import Featured from "../../molecules/Featured/Featured";
import Chart from "../../atoms/Chart/Chart";
import Transaction from "../../organisms/Transaction/Transaction";
import "./Home.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAPIActionJSON } from "../../../../api/ApiActions";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const shopId = useSelector((state) => state.shop.id);
  // console.log("shop id:", shopId);
  const handleResponseGetItem = (response) => {
    if (!response.success) {
      toast.error(response.message);
      return;
    }
    console.log(response.data);
  };
  const getItemsData = () => {
    dispatch(
      getAPIActionJSON("get_all_shop_items", null, null, `/${shopId}`, (e) =>
        handleResponseGetItem(e)
      )
    );
  };
  const handleResponseGetCustomer = (response) => {
    if (!response.success) {
      toast.error(response.message);
      return;
    }
    console.log("Thanh cong r");
    console.log(response.data);
  };
  const getCustomerData = () => {
    dispatch(
      getAPIActionJSON("get_list_customers", null, null, `/${shopId}`, (e) =>
        handleResponseGetCustomer(e)
      )
    );
  };
  // const handleResponse = (response) => {
  //   if (!response.success) {
  //     Alert.alert(response.message);
  //     return;
  //   }
  //   console.log(response.data);
  // };
  // const getOrdersData = () => {
  //   dispatch(
  //     getAPIActionJSON("get_shop_orders", null, null, `/${shopId}`, (e) =>
  //       handleResponse(e)
  //     )
  //   );
  // };
  useEffect(() => {
    getItemsData();
    getCustomerData();
    // getOrdersData();
  }, [dispatch, shopId]);
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Transaction />
        </div>
      </div>
    </div>
  );
};

export default Home;
