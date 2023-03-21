import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {};

const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (build) => {
    build.addCase(getProducts.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const getProducts = createAsyncThunk(
  "/getproducts",
  async (a, thunk) => {
    try {
      const url = "http://localhost:5000/api/products";
      const token = localStorage.getItem("store");

      const { data } = await axios.get(url, {
        headers: { "store-access": token },
      });

      if (data.success) {
        return data;
      }
    } catch (error) {
      return thunk.rejectWithValue("something went wrong");
    }
  }
);

export default productSlice.reducer;
