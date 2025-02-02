import React from "react";
import { Footer, Navbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { increaseProduct,removeToCart ,decreaseProduct } from "../../../Frontend/store/reducers/Cart";
import { useEffect } from "react";

const Cart = () => {
  const {title} = useParams()
  const {cart} = useSelector((store) => store.cart);
  // console.log(total_price);
  useEffect(() => {
    localStorage.setItem("cart" , JSON.stringify(cart))
  }, [cart])
  

  const dispatch = useDispatch();

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">Your Cart is Empty</h4>
            <Link to={`/${title}`} className="btn  btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };


  const ShowCart = () => {
    let subtotal = 0;
    let shipping = 40.0;
    let totalItems = 0;
    cart.map((item) => {
      return (subtotal += item.product.price * item.quantity);
    });

    cart.map((item) => {
      return (totalItems += item.quantity);
    });
    return (
      <>
        <section className="h-100 gradient-custom">
          <div className="container py-5">
            <div className="row d-flex justify-content-center my-4">
              <div className="col-md-8">
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h5 className="mb-0">Item List</h5>
                  </div>
                  <div className="card-body">
                    {cart.map((item) => {
                      return (
                        <div key={item.id}>
                          <div className="row d-flex align-items-center">
                            <div className="col-lg-3 col-md-12">
                              <div
                                className="bg-image rounded"
                                data-mdb-ripple-color="light"
                              >
                                <img
                                  src={item.product.product_img_path && item.product.product_img_path[0]}
                                  className="w-100"
                                  alt={item.product.name}
                                  width={100}
                                  height={75}
                                />
                              </div>
                            </div>

                            <div className="col-lg-5 col-md-6">
                              <p>
                                <strong>{item.product.name}</strong>
                              </p>
                               <p>Color: blue</p>
                              <p>Size: M</p> 

                              <button className="mt-3 btn btn-dark" onClick={() => dispatch(removeToCart(item.id))} > Remove </button>
                            </div>

                            <div className="col-lg-4 col-md-6">
                              <div
                                className="d-flex  mb-4"
                                style={{ maxWidth: "300px"  }}
                              >
                                <button
                                  className="btn px-3"
                                  onClick={() => {
                                    dispatch(decreaseProduct(item.id))
                                  }}
                                >
                                  <i className="fas fa-minus"></i>
                                </button>

                                <p className="mx-5 mt-3">{item.quantity}</p>

                                <button
                                  className="btn px-3"
                                  onClick={() => {
                                    dispatch(increaseProduct(item.id))
                                  }}
                                >
                                  <i className="fas fa-plus"></i>
                                </button>
                              </div>

                              <p className="text-start text-md-center">
                                <strong>
                                  <span className="text-muted">{item.product.quantity}</span>{" "}
                                *  ₹{item.product.price}
                                </strong>
                              </p>
                            </div>
                          </div>

                          <hr className="my-4" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-header py-3 bg-light">
                    <h5 className="mb-0">Order Summary</h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Products ({totalItems})<span>₹{Math.round(subtotal)}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                        Shipping
                        <span>₹{shipping}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <div>
                          <strong>Total amount</strong>
                        </div>
                        <span>
                          <strong>₹{Math.round(subtotal + shipping)}</strong>
                        </span>
                      </li>
                    </ul>

                    <Link
                      to={`/${title}/checkout`}
                      className="btn btn-dark btn-lg btn-block"
                    >
                      Go to checkout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Cart</h1>
        <hr />
        {cart.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
