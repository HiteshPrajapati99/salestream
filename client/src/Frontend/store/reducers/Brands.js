import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(getBrands.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const getBrands = createAsyncThunk("/getBrands", async (a, thunk) => {
  try {
    const url = "http://localhost:5000/api/brands";
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
});

export default brandSlice.reducer;
