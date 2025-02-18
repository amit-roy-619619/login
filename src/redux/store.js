import { configureStore } from "@reduxjs/toolkit";
import productCounterReducer from "./productCounterSlice";
import apiDataReducer from "./apiDataSlice";

const store = configureStore({
  reducer: {
    productCounter: productCounterReducer,
    apiData: apiDataReducer,
  },
});

export default store;
