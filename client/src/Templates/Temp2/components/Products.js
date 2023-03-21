import React, { useEffect, useState } from "react";
import { dummyProduct } from "../utils/Products";
import { useSelector } from "react-redux";

export default function Products() {
  const data = useSelector((tempData) => tempData.products);

  const [Products, setProducts] = useState([]);

  useEffect(() => {
    if (data.success) {
      setProducts(data.products);
    } else {
      setProducts(dummyProduct);
    }
  }, []);

  return (
    <>
      <section className="product_section layout_padding">
        <div className="container">
          <div className="heading_container heading_center">
            <h2>
              Our <span>products</span>
            </h2>
          </div>
          <div className="row">
            {Products &&
              Products.map((item) => (
                <div className="col-sm-6 col-md-4 col-lg-4">
                  <div className="box">
                    <div className="option_container">
                      <div className="options">
                        <a href className="option1">
                          {item.name}
                        </a>
                        <a href className="option2">
                          Buy Now
                        </a>
                      </div>
                    </div>
                    <div className="img-box">
                      <img src={item?.product_img_path[0]} alt="" />
                    </div>
                    <h5 className="text-center"> {item.name} </h5>
                    <h6 className="text-center text-bold">
                      {" "}
                      ₹ {item.special_price}{" "}
                    </h6>
                  </div>
                </div>
              ))}
          </div>

          <div className="btn-box">
            <a href>View All products</a>
          </div>
        </div>
      </section>
    </>
  );
}
