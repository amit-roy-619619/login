import React, { useContext, useEffect, useState } from "react";
import { Context } from "./main";
import { Navigate } from "react-router-dom";
import Card from "./Card";

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = () => {
      try {
        fetch("https://fakestoreapi.com/products")
          .then((response) => response.json())
          .then((data) => setProducts(data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="cart-container">
      {products.map((product, index) => {
        return (
          <div key={index}>
            <Card
              index={product.index}
              image={product.image}
              category={product.category}
              description={product.description}
              price={product.price}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Products;
