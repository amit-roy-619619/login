import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "./main";
import { toast } from "react-toastify";
import { FaCartArrowDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { empty } from "./redux/productCounterSlice";

const Navbar = () => {
  const { setIsAuthenticated, isAuthenticated } = useContext(Context);
  const productCount = useSelector(
    (state) => state.productCounter.totalProducts
  );
  const dispatch = useDispatch();
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={"/"}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/products"}>
                  Products
                </Link>
              </li>
              {!isAuthenticated ? (
                <li className="nav-item">
                  <Link className="nav-link " to={"/login"}>
                    Login
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <button
                    className="nav-link"
                    onClick={() => {
                      setIsAuthenticated(false);
                      //   alert("your are logged out!");
                      toast.success("You are Successfully Logged Out!");
                      dispatch(empty());
                    }}
                  >
                    Logout
                  </button>
                </li>
              )}
              <li className="nav-item">
                <div className="nav-link">
                  <span>{productCount}</span>{" "}
                  <FaCartArrowDown
                    style={{ height: "35px", width: "35px", cursor: "pointer" }}
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
