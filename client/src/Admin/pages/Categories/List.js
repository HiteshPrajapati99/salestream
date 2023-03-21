import React, { useEffect, useState, useRef } from "react";
import { Box,  IconButton } from "@mui/material";
import styled from "styled-components";
import axios from "axios";
import { MdEdit } from "react-icons/md";
import moment from "moment";
import { useDispatch } from "react-redux";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CmpTitle, Toast, DataTable } from "../../components";
import { getCategory } from "../../redux-store/reducer/Category";

export default function ListAllCategory() {

  //  Toast
  const tostRef = useRef(null);
  const [tostData, settostData] = useState({
    success: false,
    message: "",
  });

  const dishpatch = useDispatch();

  const [Categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCategories = async () => {
    const url = "http://localhost:5000/store/categories/list";
    const token = localStorage.getItem("x-access-token");
    const { data } = await axios.get(url, {
      headers: { "x-access-token": token },
    });
    // console.log(data);
    if (data.success) {
      setCategories(data.data);
      setLoading(false);
    } else {
      setCategories([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handledelete = async (params) => {
    var parentIsExist = Categories.filter(
      (data) => data.parent_id && data.parent_id?._id === params.row._id
    );
    if (parentIsExist.length > 0) {
      alert("please remove sub Categoris first");
    } else {
      const url = `http://localhost:5000/store/categories/delete/${params.row._id}`;
      const token = localStorage.getItem("x-access-token");

      const { data } = await axios.delete(url, {
        headers: { "x-access-token": token },
      });

      settostData({ success: data.success, message: data.message });
      // console.log(data);
      if (data.success) {
        getCategories();
        dishpatch(getCategory());
        tostRef.current.show();
      } else {
        tostRef.current.show();
      }
    }
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "parent name",
      width: 120,
      valueGetter: (params) => {
        return params.row.parent_id !== null ? params.row.parent_id.name : "-";
      },
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
              onClick={() => handledelete(params)}
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
      <Box className="top-title">
        <CmpTitle
          navigate={true}
          navlink="/admin/category/create"
          text=" All Categories"
          breadcrumbs={{ last: "Categories" }}
          buttonname="Add New"
        />
        <Toast
          message={tostData.message}
          success={tostData.success}
          tostRef={tostRef}
        />
      </Box>
      <Box display="flex" justifyContent="center" p={4}>
        <Box className="table-box">
          <DataTable
            rows={Categories}
            columns={columns}
            loading={loading}
            noRowMessage="No Categories Available"
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
