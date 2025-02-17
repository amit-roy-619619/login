import React, { useContext } from "react";
import { Context } from "./main";
import { Navigate } from "react-router-dom";

const Products = () => {
  const { isAuthenticated } = useContext(Context);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div>
      <h1>This is Product page</h1>
    </div>
  );
};

export default Products;
