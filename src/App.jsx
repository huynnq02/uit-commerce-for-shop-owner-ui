import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./components/pages/Home/Home";
import List from "./components/pages/List/List";
import New from "./components/pages/New/New";
import Single from "./components/pages/Single/Single";
import Login from "./components/pages/Login/Login";
import { productInputs, userInputs } from "./formSource";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="users" >
          <Route index element={<List/>}/>
          <Route path=":userId" element={<Single />} />
          <Route path="new" element={<New inputs={userInputs} title="Add New User" />} />
        </Route>
        <Route path="products">
          <Route index element={<List/>}/>
          <Route path=":productId" element={<Single />} />
          <Route path="new" element={<New inputs={productInputs} title="Add New Product" />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
