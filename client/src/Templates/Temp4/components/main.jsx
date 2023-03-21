import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick"

const Home = () => {
  const { banners } = useSelector((clientStore) => clientStore)

  const [Banner, setBanner] = useState([])
  // console.log(banners);
  useEffect(() => {
    if (banners.success) {
      setBanner(banners.data)
    }
  }, [banners])

  const settings = {
    dots: false,
    infinite: true,
    // speed: 8000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    pauseOnHover: true
  };
  return (
    <Slider {...settings} >
      {Banner.length > 0 && Banner.map((item) => (

        <div className="hero border-1 pb-3" key={item._id}>
          <div className="card bg-dark text-white border-0 mx-3">
            <img
              className="card-img"
              src={item?.images_path[0]}
              alt="Card"
              height={480}
            />
            <div className="card-img-overlay d-flex align-items-center">
              <div className="container">
                <h5 className="card-title fs-1 text fw-black">{item.title}</h5>
                <p className="card-text fs-5 d-none d-sm-block ">
                  {item.sub_title}
                </p>
                {/* <div className="card-text fs-5 d-none d-sm-block " dangerouslySetInnerHTML={{ __html: item.desc }} /> */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Home;
