import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import logo1 from "../assets/img/company-logos/1.png";
import logo2 from "../assets/img/company-logos/2.png";
import logo3 from "../assets/img/company-logos/3.png";
import logo4 from "../assets/img/company-logos/4.png";
import logo5 from "../assets/img/company-logos/5.png";

export default function Future() {
  const [Blogs, setBlogs] = useState([]);

  const getBlogs = async () => {
    const url = "http://localhost:5000/api/blogs";
    const store = localStorage.getItem("store");
    const { data } = await axios.get(url, {
      headers: { "store-access": store },
    });
    if (data.success) {
      setBlogs(data.data);
      console.log(data);
    } else {
      setBlogs([]);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    className: "center",
    centerPadding: "60px",
    arrows: false,
  };

  return (
    <>
      <div className="latest-news pt-100 pb-150">
        <div className="container">
          <div className="section-title">
            <h3 className="text-center">
              <span className="orange-text">Latest </span> Blogs
            </h3>
          </div>
          <div className="row">
            {Blogs &&
              Blogs?.slice(0, 3).map((item) => {
                return (
                  <div
                    className="col-lg-4 col-md-6"
                    style={{ height: "600px" }}
                    key={item._id}
                  >
                    <div className="single-latest-news">
                      <a href="single-news.html">
                        <div className="latest-news-bg">
                          <img
                            src={item?.image_path[0]}
                            alt=""
                            height="200px"
                            width="355px"
                            style={{ borderRadius: "10px 10px 0px 0px" }}
                          />
                        </div>
                      </a>
                      <div className="news-text-box">
                        <h3>
                          <a href="single-news.html">{item.title}</a>
                        </h3>
                        <p className="blog-meta">
                          <span className="author">
                            <i className="fas fa-user" /> Admin
                          </span>
                          <span className="date">
                            <i className="fas fa-calendar" /> 27 December, 2019
                          </span>
                        </p>
                        <p className="excerpt">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item.desc,
                            }}
                          />
                        </p>
                        <a href="single-news.html" className="read-more-btn">
                          read more <i className="fas fa-angle-right" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      {/* carousel */}
      <div className="logo-carousel-section">
        <div className="container">
          <div className="row">
            <Slider {...settings}>
              <div className="single-logo-item">
                <img src={logo1} alt="" />
              </div>
              <div className="single-logo-item">
                <img src={logo2} alt="" />
              </div>
              <div className="single-logo-item">
                <img src={logo3} alt="" />
              </div>
              <div className="single-logo-item">
                <img src={logo4} alt="" />
              </div>
              <div className="single-logo-item">
                <img src={logo5} alt="" />
              </div>
            </Slider>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="footer-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="footer-box about-widget">
                <h2 className="widget-title">About us</h2>
                <p>
                  Ut enim ad minim veniam perspiciatis unde omnis iste natus
                  error sit voluptatem accusantium doloremque laudantium, totam
                  rem aperiam, eaque ipsa quae.
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="footer-box get-in-touch">
                <h2 className="widget-title">Get in Touch</h2>
                <ul>
                  <li>34/8, East Hukupara, Gifirtok, Sadan.</li>
                  <li>support@fruitkha.com</li>
                  <li>+00 111 222 3333</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="footer-box pages">
                <h2 className="widget-title">Pages</h2>
                <ul>
                  <li>
                    <a href="index.html">Home</a>
                  </li>
                  <li>
                    <a href="about.html">About</a>
                  </li>
                  <li>
                    <a href="services.html">Shop</a>
                  </li>
                  <li>
                    <a href="news.html">News</a>
                  </li>
                  <li>
                    <a href="contact.html">Contact</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="footer-box subscribe">
                <h2 className="widget-title">Subscribe</h2>
                <p>Subscribe to our mailing list to get the latest updates.</p>
                <form action="index.html">
                  <input type="email" placeholder="Email" />
                  <button type="submit">
                    <i className="fas fa-paper-plane" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
