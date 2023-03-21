import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../Frontend/store/reducers/Products";
import { getBrands } from "../../../Frontend/store/reducers/Brands";
import { getBlog } from "../../../Frontend/store/reducers/Blog";
import { getBanner } from "../../../Frontend/store/reducers/Banner";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getBrands());
    dispatch(getBlog());
    dispatch(getBanner());
  }, []);

  const { title } = useParams();
  const [isLogin, setisLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access-token");
    if (token) {
      setisLogin(true);
    } else {
      setisLogin(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access-token")
    navigate(`/${title}/login`)
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-4 px-2" to={`/${title}`}>
          {" "}
          {title.toLocaleUpperCase()}{" "}
        </NavLink>
        <button
          className="navbar-toggler mx-2"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto my-2 text-center">
            <li className="nav-item">
              <NavLink className="nav-link" to={`/${title}`}>
                Home{" "}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={`/${title}/product`}>
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={`/${title}/about`}>
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={`/${title}/contact`}>
                Contact
              </NavLink>
            </li>
          </ul>
          <div className="buttons text-center">
            {isLogin ? (
              <button
                onClick={handleLogout}
                className="btn btn-outline-dark m-2"
              >
                 LogOut
              </button>
            ) : (
              <>
                <NavLink
                  to={`/${title}/register`}
                  className="btn btn-outline-dark m-2"
                >
                  <i className="fa fa-user-plus mr-1"></i> Register
                </NavLink>
                <NavLink
                  to={`/${title}/login`}
                  className="btn btn-outline-dark m-2"
                >
                  <i className="fa fa-sign-in-alt mr-1"></i> Login
                </NavLink>
              </>
            )}
            <NavLink to={`/${title}/cart`} className="btn btn-outline-dark m-2">
              <i className="fa fa-cart-shopping mr-1"></i> Cart{" "}
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
