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

const Home = () => {
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
