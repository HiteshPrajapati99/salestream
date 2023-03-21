import React, { useState } from "react";
import Styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getData } from "./Template";
import { Button, InputAdornment, TextField } from "@mui/material";
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
export default function Create() {
  const navigate = useNavigate();

  const [Data, setData] = useState({
    title: "",
    email: "",
  });

  const handlesubmit = async () => {
    if (Data.title && Data.email) {
      getData(Data);

      setTimeout(() => {
        navigate("/admin/store/template");
      }, 800);
    }
  };

  return (
    <Wrapper>
      <div className="form-data">
        <div id="form_wrapper">
          <h2 className="text-center" style={{ color: "rgba(0,0,0,0.3)" }}>
            Create Store
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
                          <FaUserAlt />
                        </InputAdornment>
                      ),
                    }}
                    value={Data.title}
                    onChange={(e) =>
                      setData({ ...Data, title: e.target.value })
                    }
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
                    onChange={(e) =>
                      setData({ ...Data, email: e.target.value })
                    }
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
