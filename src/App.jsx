import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./components/pages/Home/Home";
import List from "./components/pages/List/List";
import New from "./components/pages/New/New";
import Single from "./components/pages/Single/Single";
import Login from "./components/pages/Login/Login";
import UserProvider from "./Context/UserContext/UserProvider";
import AuthProvider from "./Context/AuthContext/AuthProvider";
import PrivateRoute from "./PrivateRoute";
import { productInputs, userInputs } from "./formSource";
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
                <Route
                  path="new"
                  element={<New inputs={userInputs} title="Add New User" />}
                />
                <Route
                  path="edit"
                  element={<New inputs={userInputs} title="Edit User" />}
                />
              </Route>
              <Route path="products">
                <Route index element={<List />} />
                <Route path=":productId" element={<Single />} />
                <Route
                  path="new"
                  element={
                    <New inputs={productInputs} title="Add New Product" />
                  }
                />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </UserProvider>
    </div>
  );
}
export default App;
