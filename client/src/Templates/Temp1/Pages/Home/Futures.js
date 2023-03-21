import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { useParams } from "react-router-dom";
import { dummyBrands } from "../../utils/Brands";

export default function Futures() {
  const { title } = useParams();
  const [Brands, setBrands] = useState([]);
  const getBrands = async () => {
    const url = "http://localhost:5000/api/brands";
    const store = localStorage.getItem("store");
    const { data } = await axios.get(url, {
      headers: { "store-access": store },
    });
    if (data.success) {
      setBrands(data.data);
    } else {
      setBrands(dummyBrands);
    }
  };

  useEffect(() => {
    getBrands();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 8000,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
  };
  return (
    <>
      {/* ================== Subscribe ================= */}

      <div className="container-fluid bg-secondary my-5">
        <div className="row justify-content-md-center py-5 px-xl-5">
          <div className="col-md-6 col-12 py-5">
            <div className="text-center mb-2 pb-2">
              <h2 className="section-title px-5 mb-3">
                <span className="bg-secondary px-2">Stay Updated</span>
              </h2>
              <p>
                Amet lorem at rebum amet dolores. Elitr lorem dolor sed amet
                diam labore at justo ipsum eirmod duo labore labore.
              </p>
            </div>
            <form action>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control border-white p-4"
                  placeholder="Email Goes Here"
                />
                <div className="input-group-append">
                  <button className="btn btn-primary px-4">Subscribe</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ================= Brands List Start  ======================*/}
      <div className="px-xl-5">
        <Slider {...settings}>
          {Brands.map((item) => (
            <div id={item._id}>
              <img src={item.images_path[0]} alt="" height="50px" />
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
