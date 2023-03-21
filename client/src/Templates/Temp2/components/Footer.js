import React from "react";
import logo from "../images/logo.png";

export default function Footer() {
  return (
    <>
      <section className="subscribe_section">
        <div className="container-fuild">
          <div className="box">
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <div className="subscribe_form ">
                  <div className="heading_container heading_center">
                    <h3>Subscribe To Get Discount Offers</h3>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor
                  </p>
                  <form action>
                    <input type="email" placeholder="Enter your email" />
                    <button>subscribe</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="full">
                <div className="logo_footer">
                  <a href="#">
                    <img width={210} src={logo} alt="#" />
                  </a>
                </div>
                <div className="information_f">
                  <p>
                    <strong>ADDRESS:</strong> 28 White tower, Street Name New
                    York City, USA
                  </p>
                  <p>
                    <strong>TELEPHONE:</strong> +91 987 654 3210
                  </p>
                  <p>
                    <strong>EMAIL:</strong> yourmain@gmail.com
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-7">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="widget_menu">
                        <h3>Menu</h3>
                        <ul>
                          <li>
                            <a href="#">Home</a>
                          </li>
                          <li>
                            <a href="#">About</a>
                          </li>
                          <li>
                            <a href="#">Services</a>
                          </li>
                          <li>
                            <a href="#">Testimonial</a>
                          </li>
                          <li>
                            <a href="#">Blog</a>
                          </li>
                          <li>
                            <a href="#">Contact</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="widget_menu">
                        <h3>Account</h3>
                        <ul>
                          <li>
                            <a href="#">Account</a>
                          </li>
                          <li>
                            <a href="#">Checkout</a>
                          </li>
                          <li>
                            <a href="#">Login</a>
                          </li>
                          <li>
                            <a href="#">Register</a>
                          </li>
                          <li>
                            <a href="#">Shopping</a>
                          </li>
                          <li>
                            <a href="#">Widget</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="widget_menu">
                    <h3>Newsletter</h3>
                    <div className="information_f">
                      <p>
                        Subscribe by our newsletter and get update protidin.
                      </p>
                    </div>
                    <div className="form_sub">
                      <form>
                        <fieldset>
                          <div className="field">
                            <input
                              type="email"
                              placeholder="Enter Your Mail"
                              name="email"
                            />
                            <input type="submit" defaultValue="Subscribe" />
                          </div>
                        </fieldset>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
