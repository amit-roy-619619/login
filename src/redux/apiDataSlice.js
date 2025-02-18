import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk(
  "data/fetchData",
  async (__, { dispatch }) => {
    try {
      dispatch(fetchDataRequest());
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      dispatch(fetchDataSuccess(data));
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
  }
);

const apiDataSlice = createSlice({
  name: "apiData",
  initialState: { data: [], isLoading: false, error: null },
  reducers: {
    fetchDataRequest: (state) => {
      state.isLoading = true;
    },
    fetchDataSuccess: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    fetchDataFailure: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
  },
});

export const { fetchDataRequest, fetchDataSuccess, fetchDataFailure } =
  apiDataSlice.actions;
export default apiDataSlice.reducer;
