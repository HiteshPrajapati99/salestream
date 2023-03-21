import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {};

const categorySlice = createSlice({
  name: "category",
  initialState,
  extraReducers: (build) => {
    build.addCase(getCategory.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const getCategory = createAsyncThunk(
  "category/get",
  async (a, thunkAPi) => {
    try {
      const url = "http://localhost:5000/store/categories/list";
      const token = localStorage.getItem("x-access-token");
      const { data } = await axios.get(url, {
        headers: { "x-access-token": token },
      });

      if (data.success) {
        return data;
      } else {
        return [];
      }
    } catch (error) {
      return thunkAPi.rejectWithValue("something went wrong");
    }
  }
);

export default categorySlice.reducer;
