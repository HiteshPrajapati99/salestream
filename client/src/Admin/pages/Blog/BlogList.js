import React, { useEffect, useState, useRef } from "react";
import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CmpTitle, Toast, DataTable } from "../../components";

export default function BlogList() {
  //  Toast
  const tostRef = useRef(null);
  const [tostData, settostData] = useState({
    success: false,
    message: "",
  });

  const [Blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);

  const getBlog = async () => {
    const token = localStorage.getItem("x-access-token");
    const url = "http://localhost:5000/store/blog";
    const { data } = await axios.get(url, {
      headers: { "x-access-token": token },
    });
    // console.log(data);
    if (data.success) {
      setBlog(data.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlog();
  }, []);

  const handledelete = async (id) => {
    const url = `http://localhost:5000/store/blog/delete/${id}`;
    const token = localStorage.getItem("x-access-token");
    const { data } = await axios.delete(url, {
      headers: { "x-access-token": token },
    });
    settostData({ success: data.success, message: data.message });
    if (data.success) {
      getBlog();
      tostRef.current.show();
    } else {
      tostRef.current.show();
    }
  };

  const columns = [
    {
      field: "title",
      headerName: "Blog",
      renderCell: (params) => (
        <Box display="flex" justifyContent="center" alignItems="center" gap={3}>
          <Avatar variant="square" src={params?.row?.image_path[0]} />
          <Link className="edit-link" to={`/admin/blog/edit/${params.row._id}`}>
            <Typography> {params.row.title} </Typography>
          </Link>
        </Box>
      ),
      width: 250,
    },
    {
      field: "sub_title",
      width: 200,
      headerName: "Sub Title",
    },
    {
      field: "posted_by",
      headerName: "Posted By",
      width: 150,
      renderCell: (params) =>
        params?.row?.posted_by[0].firstname +
        " " +
        params?.row?.posted_by[0].lastname,
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
              component={Link}
              to={`/admin/blog/edit/${params.row._id}`}
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
    <Wrapper>
      <Box className="top-title">
        <CmpTitle
          navigate={true}
          navlink="/admin/blog/create"
          text="Blog List"
          breadcrumbs={{ last: "Blog" }}
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
            rows={Blog}
            columns={columns}
            loading={loading}
            noRowMessage="No Blog Available"
          />
          <Toast
            message={tostData.message}
            success={tostData.success}
            tostRef={tostRef}
          />
        </Box>
      </Box>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .bred-dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: rgb(145, 158, 171);
  }
  .edit-link {
    color: #000;
    text-decoration: none;
    & :hover {
      text-decoration: underline;
    }
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
    width: 80%;
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
