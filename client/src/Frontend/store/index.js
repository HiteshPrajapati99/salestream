import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./reducers/Products";
import brandSlice from "./reducers/Brands";
import blogSlice from "./reducers/Blog";
import bannerSlice from "./reducers/Banner";
import cartSlice from "./reducers/Cart"

export const clientStore = configureStore({
  reducer: {
    products: ProductSlice,
    brands: brandSlice,
    blogs: blogSlice,
    banners: bannerSlice,
    cart : cartSlice,
  },
});
