import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {};

const brandSlice = createSlice({
  name: "brand",
  initialState,
  extraReducers: (build) => {
    build.addCase(getBrand.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const getBrand = createAsyncThunk("brand/get", async (a, thunkAPi) => {
  try {
    const url = "http://localhost:5000/store/brand";
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
});

export default brandSlice.reducer;
