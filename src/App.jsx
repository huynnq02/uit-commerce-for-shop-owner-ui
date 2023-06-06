import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./components/pages/Home/Home";
import List from "./components/pages/ListUsers/List";
import New from "./components/pages/New/New";
import Single from "./components/pages/EditUser/EditUser";
import Login from "./components/pages/Login/Login";
import ManageOrder from "./components/pages/ManageOrder/ManageOrder";
import { AuthProvider } from "./Context/AuthContext/AuthContext";
import PrivateRoute from "./PrivateRoute";
import AddProduct from "./components/pages/AddProduct/AddProduct";
import DetailProduct from "./components/pages/DetailProduct/DetailProduct";
import ListProduct from "./components/pages/ListProduct/ListProduct";
import ManageCategories from "./components/pages/ManageCategories/ManageCategories";
import ReactDOM from "react-dom";
import store from "../app/store";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path={"/"} element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="users">
            <Route index element={<List />} />
            <Route path=":userId" element={<Single />} />
            <Route path="edit/:userId" element={<New />} />
          </Route>
          <Route path="products">
            <Route index element={<ListProduct />} />
            <Route path=":productId" element={<DetailProduct />} />
            <Route path="new" element={<AddProduct />} />
          </Route>
          <Route path="manage-categories" element={<ManageCategories />} />
          <Route path="orders">
            <Route index element={<ManageOrder />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default function renderApp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

// Render the app
renderApp();
