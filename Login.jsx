import React, { useContext, useState } from "react";
import { Context } from "./src/main";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();

  if (isAuthenticated) {
    return <Navigate to={"/products"} />;
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    //     try {
    //       const response = await axios.post(
    //         "https://api.escuelajs.co/api/v1/auth/login",
    //         {
    //           email,
    //           password,
    //         },
    //         {
    //           withCredentials: true,
    //           headers: { "Content-Type": "application/json" },
    //         }
    //       );
    //       console.log(response);
    //       if (response.access_token) {
    //         setIsAuthenticated(true);
    //         navigateTo("/products");
    //       }
    //     } catch (error) {
    //       console.log(error);
    //       alert("password or email is wrong!");
    //     }
    //   };
    fetch("https://api.escuelajs.co/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        //console.log(result);
        if (result.access_token) {
          alert("You are logged in.");
          setIsAuthenticated(true);
          navigateTo("/products");
        } else {
          //   console.log(email);
          //   console.log(password);
          alert("Please check your login information.");
        }
      });
  };
  return (
    <>
      <h2 className="d-flex container justify-content-center">Login</h2>
      <div className="d-flex container justify-content-center">
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <div id="emailHelp" className="form-text">
              We never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
