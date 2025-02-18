import { configureStore } from "@reduxjs/toolkit";
import productCounterReducer from "./productCounterSlice";

const store = configureStore({
  reducer: {
    productCounter: productCounterReducer,
  },
});

export default store;
