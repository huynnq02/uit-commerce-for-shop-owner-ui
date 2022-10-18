import "./Single.scss";
import Sidebar from "../../molecules/Sidebar/Sidebar";
import Navbar from "../../molecules/Navbar/Navbar";
import Chart from "../../atoms/Chart/Chart";
import List from "../../organisms/Table/Table";

const Single = () => {
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src="https://images.unsplash.com/photo-1504376379689-8d54347b26c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=536&q=80"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">Bé Châu Phi</h1>
                <div className="detailItem">
                  <span className="itemKey">Phone :</span>
                  <span className="itemKey">0926828605</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address :</span>
                  <span className="itemKey">
                    336 Võ Văn Ngân, Bình Thọ, Thủ Đức, Thành phố Hồ Chí Minh
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country :</span>
                  <span className="itemKey">VietNam</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Single;
