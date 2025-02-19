import React, { useContext, useEffect, useState } from "react";

import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./redux/apiDataSlice";
import Pagination from "./Pagination";

const Products = () => {
  //const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(8);
  const { data, isLoading, error } = useSelector((state) => state.apiData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  // useEffect(() => {
  //   const fetchData = () => {
  //     try {
  //       fetch("https://fakestoreapi.com/products")
  //         .then((response) => response.json())
  //         .then((data) => setProducts(data));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // return (
  //   <div className="cart-container">
  //     {data.map((product, index) => {
  //       return (
  //         <div key={index}>
  //           <Card
  //             index={product.index}
  //             image={product.image}
  //             category={product.category}
  //             description={product.description}
  //             price={product.price}
  //           />
  //         </div>
  //       );
  //     })}
  //   </div>
  // );
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = data.slice(firstPostIndex, lastPostIndex);
  if (isLoading) {
    return (
      <div
        className="spinner-border text-primary container d-flex justify-content-center pt-20"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    );
  } else {
    return (
      <div className="cart-container">
        {currentPosts.map((product, index) => {
          return (
            <div key={index}>
              <Card
                index={product.index}
                image={product.image}
                category={product.category}
                description={product.description}
                price={product.price}
                id={product.id}
              />
            </div>
          );
        })}
        <Pagination
          totalPosts={data.length}
          postsPerPage={postPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    );
  }
};

export default Products;
