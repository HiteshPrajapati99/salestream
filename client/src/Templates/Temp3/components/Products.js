import React, { useEffect, useState } from "react";
import axios from "axios";
import { dummyProduct } from "../utils/Products";

export default function Products() {
  const [Products, setProducts] = useState([]);

  const getproducts = async () => {
    const url = "http://localhost:5000/api/products";
    const store = localStorage.getItem("store");
    const { data } = await axios.get(url, {
      headers: { "store-access": store },
    });
    if (data.success) {
      setProducts(data.products);
    } else {
      setProducts(dummyProduct);
    }
  };

  useEffect(() => {
    getproducts();
  }, []);
  return (
    <div className="product-section mt-150 mb-150">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2 text-center">
            <div className="section-title">
              <h3>
                <span className="orange-text">Our</span> Products
              </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Aliquid, fuga quas itaque eveniet beatae optio.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          {Products &&
            Products?.map((item) => (
              <div className="col-lg-4 col-md-6 text-center" key={item._id}>
                <div className="single-product-item">
                  <div className="product-image">
                    <a href="single-product.html">
                      <img
                        src={item.product_img_path[0]}
                        alt=""
                        height="250px"
                      />
                    </a>
                  </div>
                  <h3> {item.title} </h3>
                  <p className="product-price">
                    <span>Per Kg</span> {item.price} ₹
                  </p>
                  <a href="cart.html" className="cart-btn">
                    <i className="fas fa-shopping-cart" /> Add to Cart
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
