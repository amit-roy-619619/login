import React, { useContext, useState } from "react";
import { Context } from "./main";
import { GrAdd } from "react-icons/gr";
import { GrFormSubtract } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./redux/productCounterSlice";

const Card = ({ image, category, description, price, index }) => {
  //   const {
  //     productQuantity,
  //     setProductQuantity,
  //     totalPrice,
  //     setTotalPrice,
  //     productIndexArray,
  //     setProductIndexArray,
  //   } = useContext(Context);
  const dispatch = useDispatch();
  const productCount = useSelector(
    (state) => state.productCounter.totalProducts
  );
  const [individualProductQuantity, setIndividualProductQuantity] = useState(0);
  function capitalizeWords(sentence) {
    const words = sentence.split(" ");
    const capitalizedWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return capitalizedWords.join(" ");
  }

  return (
    <div className="cart-item">
      <div style={{ textAlign: "center" }}>
        <img src={image} alt="Product" />
      </div>
      <div className="item-details">
        <p>{capitalizeWords(category)}</p>
        <p>
          <span>Description : </span>
          {description.substring(0, 100)}
        </p>
        <p>
          <span>Price :</span>
          <strong>{price}</strong>
        </p>
      </div>
      <div style={{ textAlign: "center" }}>
        <span>
          <button
            className="button-style"
            onClick={() => {
              if (individualProductQuantity > -1) {
                setIndividualProductQuantity(individualProductQuantity + 1);
                dispatch(increment());
              }
            }}
          >
            <GrAdd />
          </button>
        </span>
        <input
          type="text"
          style={{
            width: "20px",
            border: "none",
            marginLeft: "80px",
            marginRight: "80px",
          }}
          value={individualProductQuantity}
          onChange={(e) => {
            setIndividualProductQuantity(e.target.value);
            let p = individualProductQuantity * price;
          }}
        />
        <span>
          <button
            className="button-style"
            onClick={() => {
              if (individualProductQuantity > 0) {
                setIndividualProductQuantity(individualProductQuantity - 1);
                dispatch(decrement());
              }
            }}
          >
            <GrFormSubtract />
          </button>
        </span>
      </div>
    </div>
  );
};

export default Card;
