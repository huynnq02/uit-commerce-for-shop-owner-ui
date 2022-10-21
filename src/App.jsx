import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./components/pages/Home/Home";
import List from "./components/pages/List/List";
import New from "./components/pages/New/New";
import Single from "./components/pages/Single/Single";
import Login from "./components/pages/Login/Login";
import ManageOrder from "./components/pages/ManageOrder/ManageOrder";
import UserProvider from "./Context/UserContext/UserProvider";
import AuthProvider from "./Context/AuthContext/AuthProvider";
import PrivateRoute from "./PrivateRoute";
import { productInputs, userInputs } from "./formSource";
import AddProduct from "./components/pages/AddProduct/AddProduct";
import DetailProduct from "./components/pages/DetailProduct/DetailProduct";
import ListProduct from "./components/pages/ListProduct/ListProduct";
function App() {
  return (
    <div className="App">
      <UserProvider>
        <AuthProvider>
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
              <Route path="orders">
                <Route index element={<ManageOrder />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </UserProvider>
    </div>
  );
}
export default App;
