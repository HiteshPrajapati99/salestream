import React, { useEffect, useState } from "react";
import Product from "../../components/Product";
import Futures from "./Futures";
import axios from "axios";
import Slider from "react-slick";
import { dummyBanner, dummyCategories } from "../../utils/Banner";
import { Link, useParams } from "react-router-dom";

export default function Home() {
  const { title } = useParams();
  const [Banner, setBanner] = useState([]);
  const [Categories, setCategories] = useState([]);

  const getBanner = async () => {
    const url = "http://localhost:5000/api/banner";
    const store = localStorage.getItem("store");

    const { data } = await axios.get(url, {
      headers: { "store-access": store },
    });
    if (data.success) {
      setBanner(data.data);
    } else {
      setBanner(dummyBanner);
    }
  };

  const getCategories = async () => {
    const url = "http://localhost:5000/api/categories";
    const store = localStorage.getItem("store");
    const { data } = await axios.get(url, {
      headers: { "store-access": store },
    });
    if (data.success) {
      setCategories(data.data);
    } else {
      setCategories(dummyCategories);
    }
  };

  useEffect(() => {
    getBanner();
    getCategories();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };

  return (
    <>
      <div className="container-fluid mb-5">
        <div className="row border-top px-xl-5">
          <div className="col-lg-3 d-none d-lg-block">
            <a
              className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100"
              data-toggle="collapse"
              href="#navbar-vertical"
              style={{ height: "65px", marginTop: "-1px", padding: "0 30px" }}
            >
              <h6 className="m-0">Categories</h6>
              <i className="fa fa-angle-down text-dark" />
            </a>
            <nav
              className="collapse show navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0"
              id="navbar-vertical"
            >
              <div
                className="navbar-nav w-100 overflow-hidden"
                style={{ height: "410px" }}
              >
                <div className="nav-item dropdown">
                  {Categories.length > 0 &&
                    Categories.map((item) => (
                      <a
                        key={item._id}
                        className="nav-link"
                        data-toggle="dropdown"
                      >
                        {item.name}
                      </a>
                    ))}
                </div>
              </div>
            </nav>
          </div>
          <div className="col-lg-9">
            <nav className="navbar navbar-expand-lg bg-light w-100 navbar-light py-3 py-lg-0 px-0">
              <a href className="text-decoration-none d-block d-lg-none">
                <h1 className="m-0 display-5 font-weight-semi-bold">
                  <span className="text-primary font-weight-bold border px-3 mr-1">
                    E
                  </span>
                  Shopper
                </h1>
              </a>
              <button
                type="button"
                className="navbar-toggler"
                data-toggle="collapse"
                data-target="#navbarCollapse"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div
                className="collapse navbar-collapse justify-content-between"
                id="navbarCollapse"
              >
                <div className="navbar-nav mr-auto py-0">
                  <a href="index.html" className="nav-item nav-link active">
                    Home
                  </a>
                  <Link to={`/${title}/products`} className="nav-item nav-link">
                    Shop
                  </Link>
                  <a href="detail.html" className="nav-item nav-link">
                    Shop Detail
                  </a>
                  <div className="nav-item dropdown">
                    <a
                      href="#"
                      className="nav-link dropdown-toggle"
                      data-toggle="dropdown"
                    >
                      Pages
                    </a>
                    <div className="dropdown-menu rounded-0 m-0">
                      <a href="cart.html" className="dropdown-item">
                        Shopping Cart
                      </a>
                      <a href="checkout.html" className="dropdown-item">
                        Checkout
                      </a>
                    </div>
                  </div>
                  <a href="contact.html" className="nav-item nav-link">
                    Contact
                  </a>
                </div>
                <div className="navbar-nav ml-auto py-0">
                  <a href className="nav-item nav-link">
                    Login
                  </a>
                  <a href className="nav-item nav-link">
                    Register
                  </a>
                </div>
              </div>
            </nav>
            {/* carasol */}

            <Slider {...settings}>
              {Banner &&
                Banner.map((item) => (
                  <div
                    id="header-carousel"
                    className="carousel slide"
                    data-ride="carousel"
                    key={item._id}
                  >
                    <div className="carousel-inner">
                      <div
                        className="carousel-item active"
                        style={{ height: "410px" }}
                      >
                        <img
                          className="img-fluid"
                          src={item?.images_path[0]}
                          alt="Image"
                        />
                        <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                          <div className="p-3" style={{ maxWidth: "700px" }}>
                            <h4 className="text-light text-uppercase font-weight-medium mb-3">
                              {item.sub_title}
                            </h4>
                            <h3 className="display-4 text-white font-weight-semi-bold mb-4">
                              {item.title}
                            </h3>
                            <a
                              href={item.button_link ? item.button_link : ""}
                              target={item.button_link && "_blank"}
                              className="btn btn-light py-2 px-3"
                            >
                              {item.button}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </Slider>
          </div>
        </div>
      </div>
      {/* Futured */}
      <div className="container-fluid pt-5">
        <div className="row px-xl-5 pb-3">
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div
              className="d-flex align-items-center border mb-4"
              style={{ padding: "30px" }}
            >
              <h1 className="fa fa-check text-primary m-0 mr-3" />
              <h5 className="font-weight-semi-bold m-0">Quality Product</h5>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div
              className="d-flex align-items-center border mb-4"
              style={{ padding: "30px" }}
            >
              <h1 className="fa fa-shipping-fast text-primary m-0 mr-2" />
              <h5 className="font-weight-semi-bold m-0">Free Shipping</h5>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div
              className="d-flex align-items-center border mb-4"
              style={{ padding: "30px" }}
            >
              <h1 className="fas fa-exchange-alt text-primary m-0 mr-3" />
              <h5 className="font-weight-semi-bold m-0">14-Day Return</h5>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div
              className="d-flex align-items-center border mb-4"
              style={{ padding: "30px" }}
            >
              <h1 className="fa fa-phone-volume text-primary m-0 mr-3" />
              <h5 className="font-weight-semi-bold m-0">24/7 Support</h5>
            </div>
          </div>
        </div>
      </div>
      {/* Offer */}
      {/* <div className="container-fluid offer pt-5">
        <div className="row px-xl-5">
          <div className="col-md-6 pb-4">
            <div className="position-relative bg-secondary text-center text-md-right text-white mb-2 py-5 px-5">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxEwwT17BuACJ78I_HIufzYOOvJrBWZQHftw&usqp=CAU"
                alt=""
              />
              <div className="position-relative" style={{ zIndex: 1 }}>
                <h5 className="text-uppercase text-primary mb-3">
                  20% off the all order
                </h5>
                <h1 className="mb-4 font-weight-semi-bold">
                  Spring Collection
                </h1>
                <a href className="btn btn-outline-primary py-md-2 px-md-3">
                  Shop Now
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-6 pb-4">
            <div className="position-relative bg-secondary text-center text-md-left text-white mb-2 py-5 px-5">
              <img src="" alt="" />
              <div className="position-relative" style={{ zIndex: 1 }}>
                <h5 className="text-uppercase text-primary mb-3">
                  20% off the all order
                </h5>
                <h1 className="mb-4 font-weight-semi-bold">
                  Winter Collection
                </h1>
                <a href className="btn btn-outline-primary py-md-2 px-md-3">
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* Product */}

      <Product />
      <Futures />
    </>
  );
}
