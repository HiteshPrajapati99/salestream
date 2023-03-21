import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducer/User";
import brandSlice from "./reducer/Brand";
import categorySlice from "./reducer/Category";
import UserStore from "./reducer/UserStore";

export const adminStore = configureStore({
  reducer: {
    user: userSlice,
    brand: brandSlice,
    category: categorySlice,
    userStore: UserStore,
  },
});
