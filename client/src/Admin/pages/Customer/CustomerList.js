import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Typography,
  Breadcrumbs,
  Stack
} from "@mui/material";
import styled from "styled-components";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import {CmpTitle, DataTable , Toast} from "../../components";


export default function UserList() {
// Tost
  const tostRef = useRef(null);
  const [tostData, settostData] = useState({
    success: false,
    message: "",
  });

  const [Customers, setCustomers] = useState([]);
  

  const getCustomer = async () => {
    const url = "http://localhost:5000/store/customers";
    const token = localStorage.getItem("x-access-token");
    const { data } = await axios.get(url, {
      headers: { "x-access-token": token },
    });
    if(data.success){
       setCustomers(data.customers);
    }else{
      settostData({success : false , message : data.message})
      tostRef.current.show()
    }
  };

  useEffect(() => {
    getCustomer();
  }, []);


  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 120,
      editable : false ,
    },
    {
      field: "mo_number",
      headerName: "Number",
      width: 120,
      editable: false  ,
    },
    {
      field: "email",
      headerName: "Email",
      type: "number",
      width: 150,
      align: "right",
      editable : false ,
      sortable: false ,
      disableColumnMenu: true,
    },
    {
      field: "isblocked",
      headerName: "is Blocked ?.",
      type: "boolean",
      width: 100,
      editable: true,
    },
    {
      field: "createdAt",
      headerName: "Create Date",
      width: 170,
      renderCell: (params) =>
        moment(params.row.createdAt).format("DD-MM-YYYY"),
    },
  
  ];
  return (
    <Div>
      
      <Box className="top-title">
        <CmpTitle
          text="Cutomers"
          breadcrumbs={{ last: "Customers" }}
          // buttonname="Add New"
        />
        <Toast
          message={tostData.message}
          success={tostData.success}
          tostRef={tostRef}
        />
      </Box>

      <Box display="flex" justifyContent="center">
          <Box
            mb={3}
            sx={{
              height: 400,
              width: "100%",
            }}
            mt={5}
          >
        
          <DataGrid
          getRowId={(row) => row._id}
          rows={Customers}
          columns={columns}
          pageSize={10}
          // loading={loading}
          rowsPerPageOptions={[10]}
          checkboxSelection
          disableSelectionOnClick          
          experimentalFeatures={{ newEditingApi: true }}
          sx={{
            border: "0px",
            boxShadow: 3,
            borderRadius: "20px",
            bgcolor: "#fff",
          }}
          components={{
            NoRowsOverlay: () => (
              <Stack
                height="100%"
                alignItems="center"
                justifyContent="center"
                fontWeight="bold"
              >
                No Customers available....
              </Stack>
            ),
          }}
        />
            <Toast
            message={tostData.message}
            success={tostData.success}
            tostRef={tostRef}
          />
          </Box>
      
      </Box>
    </Div>
  );
}
const Div = styled.div`
  .bred-dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: rgb(145, 158, 171);
  }
  .bredcrumb-links {
    cursor: pointer;
    text-decoration: none;
    color: black;
    line-height: 1.57143;
    font-size: 12px;
    font-family: "Public Sans", sans-serif;
    font-weight: 400;
    &:hover {
      text-decoration: underline;
    }
  }
`;
