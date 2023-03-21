import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

export default function Landing() {
  const navigate = useNavigate();

  const [isSticky, setisSticky] = useState(false);

  const handlesticky = () => {
    if (window.scrollY > 0 && !isSticky) {
      setisSticky(true);
    } else if (window.scrollY === 0 && isSticky) {
      setisSticky(false);
    }
  };

  window.addEventListener("scroll", handlesticky);

  return (
    <Wrapper isSticky={isSticky}>
      <div className="container-fluid  text-center bg-dark">
        <p className="text-blod text-white p-2 mb-0"> WelCome To SaleStream </p>
      </div>
      <div className="hero">
        <div className="container-fluid px-5 py-3  header">
          <div className="d-flex justify-content-between ">
            <img src="/admin/logo.png" alt="" width="250" height="50" />
            <div className="d-flex align-items-center gap-5">
              <Link className="login-link" to="/admin/login">
                Log in
              </Link>
              <button
                className="button-1 border-0 register-button"
                onClick={() => navigate("/admin/register")}
              >
                Register
              </button>
            </div>
          </div>
        </div>
        <div className="container-fluid  p-0">
          <div className="row  m-0 ">
            <Col md={6} className="col-md-6 p-5">
              <h1>Start your online store with Salestream</h1>
              <p>
                Salestream is a complete ecommerce solution that allows you to
                sell online, on social media, or in person. You can choose from
                over 70 professional and free store themes. Plus, Salestream
                makes it easy to manage your products, inventory, and orders
                from a single dashboard.
              </p>
              <button
                className="button-1 border-0 mt-3 register-button"
                onClick={() => navigate("/admin/register")}
              >
                Get started
              </button>
            </Col>
            <Col md={6} className="p-5">
              <img
                src="https://plus.unsplash.com/premium_photo-1665203501930-fe6b309c4819?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt="Salestream"
                className="w-100 h-100"
              />
            </Col>
          </div>
        </div>
        <div className="p-5">
          <div className="bg-light p-5">
            <Container>
              <h2 className="mb-5">Why choose Salestream?</h2>
              <Row>
                <Col md={4} className="mb-5 col-hover ">
                  <h3>Easy to use</h3>
                  <p>
                    Salestream is easy to use and requires no coding or design
                    skills. You can choose from over 70 free and professional
                    store themes.
                  </p>
                </Col>
                <Col md={4} className="mb-5 col-hover">
                  <h3>Secure and reliable</h3>
                  <p>
                    Salestream provides secure and reliable hosting for your
                    online store. Plus, Salestream automatically handles
                    software updates and security patches.
                  </p>
                </Col>
                <Col md={4} className="mb-5 col-hover">
                  <h3>24/7 support</h3>
                  <p>
                    Salestream offers 24/7 customer support via phone, email,
                    and live chat. Plus, there's a large community of experts
                    and users who can help you with your store.
                  </p>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>

      <div className="footer">
        <div className="footer-items">
          <div>
            <img src="/admin/logo.png" alt="" height="35px" />
          </div>
          <div>
            <p className="text-bold mt-3">
              © 2023 SaleStream, All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .login-link {
    text-decoration: none;
    color: black;
    font-size: 1.2rem;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
  .register-button {
    height: 50px;
    border-radius: 30px !important;
  }
  
  .header {
    position: sticky;
    top: 0;
    backdrop-filter: blur(10px);
    background-color: ${(props) =>
      props.isSticky ? "rgba(255, 255, 255, 0.8)" : " "};

    /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); */

    transition: background-color 0.6s ease-in-out;
  }
  .col-hover {
    transition: box-shadow 0.3s ease-in-out;
    padding: 2rem;

    &:hover {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }
  }
  .footer {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    padding: 0.3rem 3rem;
    margin-bottom: 0.3rem;
  }
  .footer-items {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
