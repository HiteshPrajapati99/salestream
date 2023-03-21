import React, { useEffect, useState } from "react";
import { dummyProduct } from "../utils/Products";
import { useSelector } from "react-redux";

export default function Product() {
  const { products } = useSelector((clientStore) => clientStore);
  console.log(products);

  const [Product, setProduct] = useState([]);

  useEffect(() => {
    if (products.success) {
      setProduct(products.products);
    } else {
      setProduct(dummyProduct);
    }
  }, [products]);

  return (
    <>
      <div className="container-fluid pt-5">
        <div className="text-center mb-4">
          <h2 className="section-title px-5">
            <span className="px-2">Trandy Products</span>
          </h2>
        </div>
        <div className="row px-xl-5 pb-3">
          {Product &&
            Product.map((item) => (
              <div className="col-lg-3 col-md-6 col-sm-12 pb-1" key={item._id}>
                <div className="card product-item border-0 mb-4">
                  <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                    <img
                      className="img-fluid w-100"
                      src={item.product_img_path[0]}
                      alt=""
                    />
                  </div>
                  <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                    <h6 className="text-truncate mb-3">{item.name}</h6>
                    <div className="d-flex justify-content-center">
                      <h6>
                        ₹{" "}
                        {item.special_price > 0
                          ? item.special_price
                          : item.price}
                      </h6>
                      <h6 className="text-muted ml-2">
                        <del>
                          {item.special_price > 0 ? "₹" + item.price : ""}{" "}
                        </del>
                      </h6>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-between bg-light border">
                    <a href className="btn btn-sm text-dark p-0">
                      <i className="fas fa-eye text-primary mr-1" />
                      View Detail
                    </a>
                    <a href className="btn btn-sm text-dark p-0">
                      <i className="fas fa-shopping-cart text-primary mr-1" />
                      Add To Cart
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
