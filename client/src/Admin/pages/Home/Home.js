import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { useSelector } from "react-redux";


export default function Home() {
  const [Products, setProducts] = useState([]);
  const [StoreData, setStoreData] = useState({});

  const userStore = useSelector((store) => store.userStore);

  const getProduct = async () => {
    const url = "http://localhost:5000/store/product";
    const token = localStorage.getItem("x-access-token");
    const { data } = await axios.get(url, {
      headers: { "x-access-token": token },
    });

    setProducts(data.products);
  };

  useEffect(() => {
    getProduct();
    setStoreData(userStore.storeData);
  }, [userStore]);

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
  };

  return (
    <Wrapper>
      {/* Home  First Grid */}
      {userStore.success ? (
        <Grid container spacing={3} p={2}>
          <Grid item xs={12} md={8} pl={1}>
            <Box
              display="flex"
              bgcolor="rgb(0 145 72 / 20%)"
              p={5}
              borderRadius="16px"
              boxShadow="0 0 10px rgba(0,0,0,0.3)"
            >
              <Box color="rgb(0, 82, 73)" pl={2}>
                <Typography fontWeight="bold" mb={3}>
                  Welcome back! <br /> Your Store Name is {StoreData?.title} !
                  {/* <br /> Selected Template  */}
                </Typography>
                <Typography mb={2}>
                  If you are going to Check Out Your Store , you need to be
                  Click Go Now Button.
                </Typography>
                <Link
                  to={`/${StoreData?.title}`}
                  style={{ textDecoration: "none" }}
                  target="_blank"
                >
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ borderRadius: "30px", fontWeight: "bold" }}
                  >
                    Go Now
                  </Button>
                </Link>
              </Box>
              {/* Image Box */}
              <Box pl={2} sx={{ display: { xs: "none", sm: "block" } }}>
                <img src="/admin/home-image.png" alt="" width="200" />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} pl={1}>
            <div className="main-slider">
              <Slider {...settings}>
                {Products &&
                  Products?.map((item) => (
                    <div className="slider-box" key={item._id}>
                      <img
                        src={item.product_img_path[0]}
                        alt="product Images"
                        width="100%"
                        height="250"
                        loading="lazy"
                        className="product-images"
                      />
                      <div className="box-bg"></div>
                      <div className="slider-item">
                        <p> Name : {item.name} </p>
                        <p> Price : {item.price} </p>
                      </div>
                    </div>
                  ))}
              </Slider>
            </div>
          </Grid>
        </Grid>
      ) : (
        <Box px={2}>
          <Box
            display="flex"
            bgcolor="rgb(0 145 72 / 20%)"
            justifyContent="space-between"
            p={5}
            borderRadius="16px"
            boxShadow="0 0 10px rgba(0,0,0,0.3)"
          >
            <Box color="rgb(0, 82, 73)" pl={2}>
              <Typography fontWeight="bold" mb={3}>
                Welcome To SaleStream ! <br /> Admin panel !
              </Typography>
              <Typography mb={2}>
                You must first establish your own online store. To build your
                online store, you simply click the Create store option.
              </Typography>
              <Link to="/admin/store/create" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ borderRadius: "30px", fontWeight: "bold" }}
                >
                  Create Store
                </Button>
              </Link>
            </Box>
            {/* Image Box */}
            <Box pl={10} sx={{ display: { xs: "none", sm: "block" } }}>
              <img src="/admin/home-image.png" alt="" width="200" />
            </Box>
          </Box>
        </Box>
      )}
      {/* Second Grid */}
      {userStore.success && (
        <Grid container spacing={3} p={3}>
          <Grid item xs={12} md={4}>
          <Link to="/admin/products" className="box-link">
          <Box  className="details-box">
            <Typography fontWeight="bold" mb={2}>
              {" "}
              Total Products{" "}
            </Typography>
            <Typography variant="h3">
              {" "}
              {Products ? Products?.length : 0}{" "}
            </Typography>
          </Box>
          </Link>
          </Grid>
          <Grid item xs={12} md={4}>
          <Link className="box-link">
          
          <Box className="details-box" >
            <Typography fontWeight="bold" mb={2}>
              {" "}
              Total Customer's{" "}
            </Typography>
            <Typography variant="h3"> 0 </Typography>
          </Box>
          </Link>
          </Grid>
          <Grid item xs={12} md={4}>
          <Link className="box-link">
          <Box className="details-box">
            <Typography fontWeight="bold" mb={2}>
              {" "}
              Total orders{" "}
            </Typography>
            <Typography variant="h3"> 0 </Typography>
          </Box>
          </Link>
          </Grid>
        </Grid>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 1rem;
  .grid-box {
    height: 8rem;
    border-radius: 10px;
    display: grid;
    place-items: center;
  }
  .main-slider {
    overflow: hidden;
    position: relative;
    border-radius: 16px;
    z-index: 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }

  .slider-box {
    position: relative;
    .slider-item {
      position: absolute;
      bottom: 0;
      font-weight: bolder;
      color: white;
      margin-left: 2rem;
    }
  }
  .box-link {
    text-decoration: none;
    color: black;

    .details-box {
      box-shadow:0 0 10px rgba(0,0,0,0.2) ;
      padding: 1.5rem;
      border-radius: 16px;
    }
  }

  .box-bg {
    inset: 0;
    position: absolute;
    background-color: rgba(22, 28, 36, 0.54);
    width: 100%;
    height: 110%;
  }
`;
