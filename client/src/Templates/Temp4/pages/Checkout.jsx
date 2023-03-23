import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
const Checkout = () => {
  
  const { cart } = useSelector((state) => state.cart);




    const [Address, setAddress] = useState({
      firstName : "",
      lastName : "",
      email : "",
      mobile_no : "",
      address : "",
      address1 : "" ,
      landmark : "",
      cityTown : "",
      country : '',
      state : "",
      pincode : 0,
      addressType : '',
      paymentType: "cod"
      });

    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;
    cart.map((item) => {
      return (subtotal += item.product.price * item.quantity);
    });

    cart.map((item) => {
      return (totalItems += item.quantity);
    });

    
  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setAddress((pre) => {
      return { ...pre, [e.target.name]: value };
    });
  };
    const handleSubmit = async (e) => {
      e.preventDefault();
      
  
      const order_data = {
        address: Address,
        cart: cart,
        order_price: Math.round(subtotal  + shipping)
      };
  
     const url = "http://localhost:5000/api/order"
      const login = localStorage.getItem("access-token");
      const store = localStorage.getItem("store")
      const {data} = await axios.post(url , order_data , {headers : {"access-token" : login , "store-access" : store}})
      console.log(data);
    };
    
    return (
      <>
      <Navbar />
        <div className="container py-5">
          <div className="row my-4">
          {/*  Right */}
            <div className="col-md-5 col-lg-4 order-md-last">
              <div className="card mb-4">
                <div className="card-header py-3 bg-light">
                  <h5 className="mb-0">Order Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Products ({totalItems})
                      <span>${Math.round(subtotal)}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      Shipping
                      <span>${shipping}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                      </div>
                      <span>
                        <strong>${Math.round(subtotal + shipping)}</strong>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          {/*  left */}

            <div className="col-md-7 col-lg-8">
            
            <div className="card mb-4">
              <div className="card-header py-3">
                <h4 className="mb-0">Contact And Address</h4>
              </div>
              <div className="card-body">
                <form className="needs-validation" onSubmit={handleSubmit}>
                  <h4 className="mb-3">Contact</h4>
                  <hr />
                  <div className="row g-3">
                    <div className="col-sm-6 my-1">
                      <label for="firstName" className="form-label">
                        First name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        name="firstName"
                        value={Address.firstName}
                        onChange={handleChange}
                        required
                      />
                      <div className="invalid-feedback">
                        Valid first name is required.
                      </div>
                    </div>

                    <div className="col-sm-6 my-1">
                      <label for="lastName" className="form-label">
                        Last name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        placeholder=""
                        name="lastName"
                        value={Address.lastName}
                        onChange={handleChange}
                        required
                      />
                      <div className="invalid-feedback">
                        Valid last name is required.
                      </div>
                    </div>

                    <div className="col-12 my-1">
                      <label for="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="you@example.com"
                        required
                        name="email"
                        value={Address.email}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">
                        Please enter a valid email address for shipping
                        updates.
                      </div>
                    </div>

                    <div className="col-12 my-1">
                      <label for="number" className="form-label">
                        Mobile Number
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="number"
                        placeholder="Enter Your Number.."
                        required
                        name="mobile_no"
                        value={Address.mobile_no}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">
                        Please enter a valid email and mobile number for
                        shipping updates.
                      </div>
                    </div>

                    <h4 className="">Address</h4>
                    <hr />
                    <div className="col-12">
                      <label for="address" className="form-label">
                        Flat , House no. , Building, Company , Apartment
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        placeholder="Apartment or suite"
                        required
                        name="address"
                        value={Address.address}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">
                        Please enter your shipping address.
                      </div>
                    </div>

                    <div className="col-12">
                      <label for="address2" className="form-label">
                        Area , Street , Sector , village
                        <span className="text-muted">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address1"
                        name="address1"
                        value={Address.address1}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-12">
                      <label for="landmark" className="form-label">
                        Landmark
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="landmark"
                        name="landmark"
                        value={Address.landmark}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-12 my-1">
                      <label for="landmark" className="form-label">
                        Town/City
                      </label>
                      <input type="text" className="form-control" 
                      id="city"
                      name="cityTown"
                      value={Address.cityTown}
                      onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-5 my-1">
                      <label for="country" className="form-label">
                        Country
                      </label>
                      <br />
                      <select className="form-select" id="country" required
                      name="country"
                      value={Address.country}
                      onChange={handleChange}
                      >
                        <option value="">Choose...</option>
                        <option value="india" >India</option>
                      </select>
                      <div className="invalid-feedback">
                        Please select a valid country.
                      </div>
                    </div>

                    <div className="col-md-4 my-1">
                      <label for="state" className="form-label">
                        State
                      </label>
                      <br />
                      <select className="form-select" id="state" required
                      name="state"
                      value={Address.state}
                      onChange={handleChange}
                      >
                        <option value="">Choose...</option>
                        <option>Gujarat</option>
                      </select>
                      <div className="invalid-feedback">
                        Please provide a valid state.
                      </div>
                    </div>

                    <div className="col-md-3 my-1">
                      <label for="zip" className="form-label">
                        Pincode
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="zip"
                        placeholder=""
                        required
                        name='pincode'
                        value={Address.pincode}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">
                        Zip code required.
                      </div>
                    </div>
                    <div className="col-12">
                      <div>
                        <label className="mb-2"> Type of Address </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="home"
                          value="home"
                          checked={Address.paymentType === "home"}
                          onChange={handleChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadio1"
                        >
                          Home
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="office"
                          value="office"
                          checked={Address.paymentType === "office"}
                          onChange={handleChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadio2"
                        >
                          Office
                        </label>
                      </div>
                    </div>
                  </div>

                  <hr className="my-4" />

                  <h4 className="mb-3">Payment</h4>

                  <div class="form-check my-3 mr-4">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck1"
                    />
                    <label class="form-check-label" for="defaultCheck1">
                      Cash On Delivery / Pay On Delivery
                    </label>
                  </div>
                  <hr />
                  {/*  
                  <div className="row gy-3">
                    <div className="col-md-6">
                      <label for="cc-name" className="form-label">
                        Name on card
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cc-name"
                        placeholder=""
                        required
                      />
                      <small className="text-muted">
                        Full name as displayed on card
                      </small>
                      <div className="invalid-feedback">
                        Name on card is required
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label for="cc-number" className="form-label">
                        Credit card number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cc-number"
                        placeholder=""
                        required
                      />
                      <div className="invalid-feedback">
                        Credit card number is required
                      </div>
                    </div>

                    <div className="col-md-3">
                      <label for="cc-expiration" className="form-label">
                        Expiration
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cc-expiration"
                        placeholder=""
                        required
                      />
                      <div className="invalid-feedback">
                        Expiration date required
                      </div>
                    </div>

                    <div className="col-md-3">
                      <label for="cc-cvv" className="form-label">
                        CVV
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cc-cvv"
                        placeholder=""
                        required
                      />
                      <div className="invalid-feedback">
                        Security code required
                      </div>
                    </div>
                  </div> */}

                  <hr className="my-4" />

                  <button className="w-100 btn btn-primary" type="submit">
                    Continue to checkout
                  </button>
                </form>
              </div>
            </div>
            
            </div>
          </div>
        </div>
  <Footer />
        </>
    );

  
};

export default Checkout;
