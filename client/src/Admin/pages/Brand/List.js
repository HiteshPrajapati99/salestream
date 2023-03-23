import React, { useEffect, useState, useRef } from "react";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { MdEdit } from "react-icons/md";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin5Line } from "react-icons/ri";
import Create from "./Create";
import { CmpTitle, Toast, DataTable } from "../../components";
import { getBrand } from "../../redux-store/reducer/Brand";
import { Link } from "react-router-dom";
import useStickyTitle from "../../hooks/useStickyTitle"

export default function BrandList() {
  const isSticky = useStickyTitle();
  //  Toast
  const tostRef = useRef(null);
  const [tostData, settostData] = useState({
    success: false,
    message: "",
  });

  const dishpatch = useDispatch();
  const { data } = useSelector((store) => store.brand);

  const [Brand, setBrand] = useState([]);
  const [loading, setLoading] = useState(true);

  const handledelete = async (id) => {
    const url = `http://localhost:5000/store/brand/delete/${id}`;
    const token = localStorage.getItem("x-access-token");

    const { data } = await axios.delete(url, {
      headers: { "x-access-token": token },
    });
    settostData({ success: data.success, message: data.message });
    if (data.success) {
      dishpatch(getBrand());
      tostRef.current.show();
    } else {
      tostRef.current.show();
    }
  };

  useEffect(() => {
    if (data && data.length !== 0) {
      setLoading(false);
      setBrand(data);
    } else {
      setLoading(false);
      setBrand([]);
    }
  }, [data]);

  const columns = [
    {
      field: "Name",
      headerName: "Product",
      headerAlign: "center",
      renderCell: (params) => (
        <Box display="flex" justifyContent="center" alignItems="center" gap={3}>
          <Avatar variant="circular" src={params?.row?.images_path[0]} />
          <Link
            className="edit-link"
            // to={`/admin/product/edit/${params.row._id}`}
          >
            <Typography> {params.row.title} </Typography>
          </Link>
        </Box>
      ),
      width: 150,
      shortable: false,
      filterable: false,
    },
    {
      field: "status",
      headerName: "Status",
      type: "boolean",
      width: 100,
    },
    {
      field: "slug",
      headerName: "Slug",
      width: 100,
    },
    {
      field: "createdAt",
      headerName: "Create Date",
      width: 180,
      renderCell: (params) =>
        moment(params.row.createdAt).format("DD-MM-YYYY  HH:MM:SS"),
    },
    {
      field: "updatedAt",
      headerName: "Update Date",
      width: 180,
      renderCell: (params) =>
        moment(params.row.updatedAt).format("DD-MM-YYYY  HH:MM:SS"),
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 100,
      renderCell: (params) => {
        return (
          <Box width="100%">
            <IconButton
              size="small"
              color="success"
              sx={{ mr: 1 }}
              // onClick={() => navigate(`/admin/product/edit/${params.row._id}`)}
            >
              <MdEdit />
            </IconButton>

            <IconButton
              size="small"
              color="error"
              onClick={() => handledelete(params.row._id)}
              sx={{ fontWeight: "bold" }}
            >
              <RiDeleteBin5Line />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <Div>
      <Box className={isSticky}>
        <CmpTitle text="All Brand" breadcrumbs={{ last: "Brand" }} />
        <Box sx={{ position: "absolute", top: "5px", right: "0" }}>
          <Create />
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" mt={3}>
        <Box className="table-box">
          <DataTable
            rows={Brand}
            columns={columns}
            loading={loading}
            noRowMessage=" No Brands Available"
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
  .edit-link {
    color: #000;
    text-decoration: none;
    & :hover {
      text-decoration: underline;
    }
  }
  .table-box {
    height: 550px;
    width: 100%;
    margin-bottom: 5rem;
  }
  /*  table csss start */
  .css-f3jnds-MuiDataGrid-columnHeaders {
    background-color: rgb(244, 246, 248);
  }
  .css-1yydnm7-MuiDataGrid-root .MuiDataGrid-cell {
    border-bottom: 0;
  }
  .css-1yydnm7-MuiDataGrid-root .MuiDataGrid-row:hover,
  .css-1yydnm7-MuiDataGrid-root .MuiDataGrid-row.Mui-hovered {
    background-color: rgb(244, 246, 248) !important;
  }

  .css-9rzdme-MuiDataGrid-root .MuiDataGrid-cell {
    border-bottom: none;
  }
  .css-9rzdme-MuiDataGrid-root .MuiDataGrid-row {
    min-height: 65px !important;
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 70px !important;
    font-weight: 500;
  }
`;
