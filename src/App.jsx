import React, { useContext } from "react";
import Login from "./Login";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Products from "./Products";
import { Context } from "./main";
import PrivateRoute from "./PrivateRoute";
import { ToastContainer } from "react-toastify";
import "./App.css";
import ProductDetails from "./ProductDetails";
import Todo from "./Todo";
import TodoList from "./TodoList";

const App = () => {
  const { isAuthenticated } = useContext(Context);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/simpletodolist" element={<TodoList />} />
          <Route path="/complecatedtodolist" element={<Todo />} />
        </Routes>
        <ToastContainer position="top-right" />
      </Router>
    </>
  );
};

export default App;
