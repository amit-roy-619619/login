import { createSlice } from "@reduxjs/toolkit";

const productCounterSlice = createSlice({
  name: "productCounter",
  initialState: { totalProducts: 0 },
  reducers: {
    increment: (state) => {
      state.totalProducts += 1;
    },
    decrement: (state) => {
      state.totalProducts -= 1;
    },
    empty: (state) => {
      state.totalProducts = 0;
    },
  },
});

export const { increment, decrement, empty } = productCounterSlice.actions;
export default productCounterSlice.reducer;
