import React, { useContext } from "react";
import Login from "./Login";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Products from "./Products";
import { Context } from "./main";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  const { isAuthenticated } = useContext(Context);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/products" element={<Products />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
