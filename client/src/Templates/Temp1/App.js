import React, { useEffect } from "react";
import { useLocation, useParams, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Navbar from "./components/Navbar";
import Product from "./components/Product";
import Protected from "./components/Protected";
import { Provider } from "react-redux";
// import "./css/style.css";
import { clientStore } from "../../Frontend/store";

export default function TempRoutes() {
  const location = useLocation();

  const { title } = useParams();

  return (
    <Provider store={clientStore}>
      <Routes>
        {/* <Navbar /> */}
        <Route path="/" element={<Protected />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<Product />} />
        </Route>
      </Routes>
    </Provider>
  );
}
