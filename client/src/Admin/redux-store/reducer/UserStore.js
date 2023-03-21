import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {};

const userStore = createSlice({
  name: "userStore",
  initialState,
  extraReducers: (build) => {
    build.addCase(getStoreInfo.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const getStoreInfo = createAsyncThunk(
  "/get/userStore",
  async (a, thunkApi) => {
    try {
      const url = "http://localhost:5000/store/store/getStoredata";
      const token = localStorage.getItem("x-access-token");

      const { data } = await axios.get(url, {
        headers: { "x-access-token": token },
      });

      return data;
    } catch (error) {
      thunkApi.rejectWithValue("something went wrong");
    }
  }
);

export default userStore.reducer;
