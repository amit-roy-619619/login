import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "./main";
import { toast } from "react-toastify";

const Navbar = () => {
  const { setIsAuthenticated, isAuthenticated } = useContext(Context);
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
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
                    }}
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
