import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Breadcrumbs,
  Stack,
  Chip
} from "@mui/material";
import styled from "styled-components";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import {CmpTitle,  Toast} from "../../components";
import useStickyTitle from "../../hooks/useStickyTitle"

export default function UserList() {
  const isSticky = useStickyTitle();
// Tost
  const tostRef = useRef(null);
  const [tostData, settostData] = useState({
    success: false,
    message: "",
  });

  const [Orders, setOrders] = useState([]);
  

  const getOrders = async () => {
    const url = "http://localhost:5000/store/orders";
    const token = localStorage.getItem("x-access-token");
    const { data } = await axios.get(url, {
      headers: { "x-access-token": token },
    });
    if(data.success){
       setOrders(data.Orders);
    }else{
      settostData({success : false , message : data.message})
      tostRef.current.show()
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  // console.log(Orders);

  const columns = [
    {
      field: "fullName",
      headerName: "Customer Name",
      width: 150,
      editable : false ,
    },
    {
      field: "order_Price",
      headerName: "Total Order",
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
    },   {
      field: "actions",
      headerName: "Status",
      width: 130,
      renderCell: (params) => {
        return (
          <Box>
              <Chip
                size="small"
                label={"Pending"}
                sx={{
                  color: "rgb(27, 128, 106)",
                  bgcolor: "rgba(54, 179, 126, 0.16)",
                  fontWeight: 700,
                  textTransform: "capitalize",
                  p: 1.6,
                }}
              />
          </Box>
        );
      },
      // editable: true,
    },
    {
      field: "createdAt",
      headerName: "Create Date",
      width: 230,
      renderCell: (params) =>
        moment(params.row.createdAt).format('MMMM Do YYYY, h:mm:ss a'),
    },
  
  ];
  return (
    <Div>
      
      <Box className={isSticky}>
        <CmpTitle
          text="Orders"
          breadcrumbs={{ last: "Orders" }}
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
          rows={Orders}
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
                No Orders available....
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
