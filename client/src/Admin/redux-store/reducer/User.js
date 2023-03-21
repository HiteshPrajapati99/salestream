import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  profile: [],
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,

  extraReducers: (build) => {
    //  Get Profile

    build.addCase(getUserProfile.pending, (state) => {
      state.isLoading = true;
    });
    build.addCase(getUserProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.isLoading = false;
    });
    build.addCase(getUserProfile.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const getUserProfile = createAsyncThunk(
  "user/getProfile",

  async (a, thunkAPi) => {
    try {
      const url = "http://localhost:5000/store/profile";
      const token = localStorage.getItem("x-access-token");
      const { data } = await axios.get(url, {
        headers: { "x-access-token": token },
      });

      return data;
    } catch (error) {
      return thunkAPi.rejectWithValue("something went wrong");
    }
  }
);

export const { login } = userSlice.actions;

export default userSlice.reducer;
