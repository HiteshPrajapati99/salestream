import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Footer, Navbar } from "../components";

const Login = () => {
  const { title } = useParams()
const navigate = useNavigate()
  const [Userdata, setUserdata] = useState({
    email : "",
    password : ""
  })

  const handleSubmit= async (e) => {
    e.preventDefault()
    const url = "http://localhost:5000/api/login"
    const token = localStorage.getItem("store")
    
    const {data} = await axios.post(url , Userdata , {headers : { "store-access" : token}} )
    if(data.success){
      localStorage.setItem("access-token" , data.token)
      navigate(`/${title}`)
    }
  }

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div class="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit} >
              <div class="my-3">
                <label for="display-4">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  name="email"
                  placeholder="name@example.com"
                  value={Userdata.email}
                 onChange={(e) => setUserdata({...Userdata , email : e.target.value})}
                  />
              </div>
              <div class="my-3">
                <label for="floatingPassword display-4">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  name="password"
                  value={Userdata.password}
                  onChange={(e) => setUserdata({...Userdata , password : e.target.value})}
                />
              </div>
              <div className="my-3">
                <p>New Here? <Link to={`/${title}/register`} className="text-decoration-underline text-info">Register</Link> </p>
              </div>
              <div className="text-center">
                <button class="my-2 mx-auto btn btn-dark" type="submit" >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
