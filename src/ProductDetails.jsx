import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa6";

const ProductDetails = () => {
  const { id } = useParams();
  const data = useSelector((state) => state.apiData.data);
  const product = data.find((item) => {
    return item.id == id;
  });
  const capitalizeWords = (sentence) => {
    const words = sentence.split(" ");
    const capitalizedWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return capitalizedWords.join(" ");
  };

  return (
    <div>
      <div
        className="card container d-flex justify-content-center"
        style={{ width: "25rem", marginBottom: "20px", marginTop: "20px" }}
      >
        <img
          className="card-img-top"
          src={product.image}
          alt="Card image cap"
        />
        <div className="card-body">
          <h3 className="card-title">{product.title}</h3>
          <h5>{capitalizeWords(product.category)}</h5>
          <p className="card-text">{product.description}</p>
          <p className="card-text">
            <strong>Price : </strong>
            <span
              style={{
                fontWeight: "bolder",
                color: "purple",
                fontSize: "20px",
              }}
            >
              {product.price}
            </span>
          </p>
        </div>
        <div>
          <FaStar />
          <span
            style={{ marginLeft: "5px" }}
          >{`${product.rating.rate} (${product.rating.count})`}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
