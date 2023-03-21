import React, { useState } from 'react'
import { Footer, Navbar } from "../components";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
const Register = () => {
    const { title } = useParams()

    const [Userdata, setUserdata] = useState({
        name : "",
        mo_number : "",
        email : "",
        password : ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(Userdata);
        const url = "http://localhost:5000/api/register"
        const token = localStorage.getItem("store")
        const {data} = await axios.post(url , Userdata , {headers : { "store-access" : token}})
    console.log(data);
    }


    return (
        <>
            <Navbar />
            <div className="container my-3 py-3">
                <h1 className="text-center">Register</h1>
                <hr />
                <div class="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <form onSubmit={handleSubmit}>
                            <div class="form my-3">
                                <label for="Name">Full Name</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    name='name'
                                    placeholder="Enter Your Full Name"
                                    value={Userdata.name}
                                    onChange={(e) => setUserdata({ ...Userdata, name :  e.target.value}) }  
                                />
                            </div>
                            <div class="form my-3">
                            <label for="mo_number"> Number</label>
                            <input
                                type="number"
                                class="form-control"
                                name="mo_number"
                                placeholder="Enter Mobile Number...."
                                value={Userdata.mo_number}
                                    onChange={(e) => setUserdata({ ...Userdata, mo_number :  e.target.value}) }  
                            />
                        </div>
                            <div class="form my-3">
                                <label for="Email">Email address</label>
                                <input
                                    type="email"
                                    class="form-control"
                                    id="Email"
                                    name='email'
                                    placeholder="name@example.com"
                                    value={Userdata.email}
                                    onChange={(e) => setUserdata({ ...Userdata, email :  e.target.value}) }  
                                />
                            </div>
                            <div class="form  my-3">
                                <label for="Password">Password</label>
                                <input
                                    type="password"
                                    class="form-control"
                                    id="Password"
                                    name="password"
                                    placeholder="Password"
                                    value={Userdata.password}
                                    onChange={(e) => setUserdata({...Userdata,  password :  e.target.value}) }  
                                />
                            </div>
                            <div className="my-3">
                                <p>Already has an account? <Link to={`/${title}/login`} className="text-decoration-underline text-info">Login</Link> </p>
                            </div>
                            <div className="text-center">
                                <button class="my-2 mx-auto btn btn-dark" type="submit" >
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Register