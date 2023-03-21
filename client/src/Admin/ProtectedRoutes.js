import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
//  Redux Store
import { useDispatch } from "react-redux";
import { getUserProfile } from "./redux-store/reducer/User";
import { getCategory } from "./redux-store/reducer/Category";
import { getBrand } from "./redux-store/reducer/Brand";
import { getStoreInfo } from "./redux-store/reducer/UserStore";

export default function ProtectedRoutes() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [isLogin, setisLogin] = useState(false);
  const token = localStorage.getItem("x-access-token");

  useEffect(() => {
    if (token) {
      setisLogin(true);
    } else {
      setisLogin(false);

      navigate("/admin/login");
    }
  }, [token]);

  

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(getBrand());
    dispatch(getCategory());
    dispatch(getStoreInfo());
  }, []);


  return isLogin && <Outlet />;
}
