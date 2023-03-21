import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(getBanner.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const getBanner = createAsyncThunk("/getBanner", async (a, thunk) => {
  try {
    const url = "http://localhost:5000/api/banner";
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

export default bannerSlice.reducer;
