import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, InputAdornment, TextField } from "@mui/material";
import { FaStore } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Styled from "styled-components";
import { useSelector } from "react-redux";
import axios from "axios";
import { getStoreInfo } from "../../redux-store/reducer/UserStore";
import { useDispatch } from "react-redux";
import { Toast } from "../../components";

export default function ManageStore() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dishpatch = useDispatch();

  // Toast
  const tostRef = useRef(null);
  const [tostData, settostData] = useState({
    success: false,
    message: "",
  });

  const userStore = useSelector((store) => store.userStore);
  const [Data, setData] = useState({
    title: "",
    email: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const handlesubmit = async () => {
    const url = `http://localhost:5000/store/store/edit/${id}`;
    const token = localStorage.getItem("x-access-token");

    const { data } = await axios.put(url, Data, {
      headers: { "x-access-token": token },
    });
    if (data.success) {
      dishpatch(getStoreInfo());
      setTimeout(() => {
        navigate("/admin/home");
      }, 800);
    }

    settostData({ success: data.success, message: data.message });
    tostRef.current.show();
  };

  useEffect(() => {
    if (userStore.success) {
      setData({
        title: userStore.storeData.title,
        email: userStore.storeData.email,
      });
    }
  }, [userStore]);

  return (
    <Wrapper>
      <div className="form-data">
        <div id="form_wrapper">
          <h2 className="text-center" style={{ color: "rgba(0,0,0,0.3)" }}>
            Store Management
          </h2>
          <div className="row mt-5 gap-2 align-items-center">
            <div className="col-sm-6  col-xs-12">
              <img
                src="/assets/store-logo.png"
                alt="Store icon"
                className="w-75"
              />
            </div>
            <div className="col-sm-5 col-xs-12">
              <div>
                <div className="d-grid gap-3">
                  <TextField
                    placeholder="Store Name"
                    type="text"
                    name="title"
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaStore />
                        </InputAdornment>
                      ),
                    }}
                    value={Data.title}
                    onChange={handleChange}
                  />
                  <TextField
                    placeholder="Enter Store Email"
                    type="email"
                    required
                    name="email"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MdEmail />
                        </InputAdornment>
                      ),
                    }}
                    value={Data.email}
                    onChange={handleChange}
                  />
                  <div className="text-end">
                    <Button
                      type="submit"
                      size="large"
                      className="button-1 border-0"
                      onClick={handlesubmit}
                    >
                      Submit
                    </Button>
                    <Toast
                      message={tostData.message}
                      success={tostData.success}
                      tostRef={tostRef}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = Styled.div`
  .form-data {
    width: 100%;
    height: calc(100vh - 12vh);
    display: grid;
    place-items: center;
  }
  
#form_wrapper {
  width: 100%;
  background-color: #ffffff;
  border-radius: 50px;
  padding: 3rem ;
  /* box-shadow: 7px 14px 34px -3px rgba(0,0,0,0.1); */

}

.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: rgba(0, 0, 0, 0.5);
  }
  .editor-class {
    padding: 0.3rem;
  }
  .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
    height: 1rem;
  }
  .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root {
    line-height: 1rem;
  }
  .css-1d3z3hw-MuiOutlinedInput-notchedOutline {
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }

  .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused {
    color: black;
  }



`;
