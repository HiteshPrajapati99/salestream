import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  AboutPage,
  ContactPage,
  Cart,
  Login,
  Register,
  Checkout,
  PageNotFound,
} from "./pages";
import { Provider } from "react-redux";
import { clientStore } from "../../Frontend/store";
import Products from "./components/Products";
// import { Product } from "./components";
import Product from "./pages/Product";

export default function App() {
  return (
    <Provider store={clientStore}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/product/*" element={<PageNotFound />} />
      </Routes>
    </Provider>
  );
}
