import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {addToCart} from "../../../Frontend/store/reducers/Cart"

// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";

import { Link, useParams } from "react-router-dom";

const Products = () => {
  const { title } = useParams()
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();



  const { products } = useSelector((clientStore) => clientStore)
  useEffect(() => {
    if (products.success) {
      console.log(products);
      setData(products.products)
    }


  }, [products]);

  // const Loading = () => {
  //   return (
  //     <>
  //       <div className="col-12 py-5 text-center">
  //         <Skeleton height={40} width={560} />
  //       </div>
  //       <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
  //         <Skeleton height={592} />
  //       </div>
  //       <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
  //         <Skeleton height={592} />
  //       </div>
  //       <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
  //         <Skeleton height={592} />
  //       </div>
  //       <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
  //         <Skeleton height={592} />
  //       </div>
  //       <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
  //         <Skeleton height={592} />
  //       </div>
  //       <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
  //         <Skeleton height={592} />
  //       </div>
  //     </>
  //   );
  // };

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category[0].name === cat);
    setFilter(updatedList);
  }
  const ShowProducts = () => {
    return (
      <>
        {/* <div className="buttons text-center py-5">
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => setFilter(data)}>All</button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("men's clothing")}>Men's Clothing</button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("women's clothing")}>
            Women's Clothing
          </button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("jewelery")}>Jewelery</button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("Electronics")}>Electronics</button>
        </div> */}

        {data.map((product) => {
          return (
            <div id={product._id} key={product._id} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
              <div className="card text-center h-100" >
                <img
                  className="card-img-top p-3"
                  src={product?.product_img_path[0]}
                  alt="Card"
                  height={300}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {product.name}...
                  </h5>
                  {/* <p className="card-text">
                    {product.desc.substring(0, 90)}...
                  </p> */}
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead"> ₹ {product.price}</li>
                  {/* <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Vestibulum at eros</li> */}
                </ul>
                <div className="card-body">
                  <Link to={`/${title}/product/${product._id}`} className="btn btn-dark m-1">
                    Buy Now
                  </Link>
                  <button className="btn btn-dark m-1" onClick={() => dispatch(addToCart(product)) }>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

          );
        })}
      </>
    );
  };
  return (
    <>
      {/* <Navbar /> */}
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Latest Products</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          <ShowProducts />
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Products;
